/*
TruePath Shadow DOM utilities
Detects shadow-root ancestors and generates framework traversal code.
*/

function tpEscapeSelector(value) {
  return value.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\r/g, '');
}

function tpGetStableCssSelector(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return '';

  var tag = element.tagName.toLowerCase();

  if (element.id) {
    return tag + '#' + tpEscapeSelector(element.id);
  }

  var testAttr = element.getAttribute('data-testid') ||
                 element.getAttribute('data-test') ||
                 element.getAttribute('data-qa');
  if (testAttr) {
    return tag + '[data-testid="' + tpEscapeSelector(testAttr) + '"]';
  }

  var nameAttr = element.getAttribute('name');
  if (nameAttr) {
    return tag + '[name="' + tpEscapeSelector(nameAttr) + '"]';
  }

  var className = element.className;
  if (className && typeof className === 'string') {
    var classes = className.split(/\s+/).filter(function (c) {
      return c.length > 0 &&
             !/^[a-f0-9]{6,}$/i.test(c) &&
             !/^[a-zA-Z0-9]{10,}$/.test(c) &&
             c.indexOf('ng-') !== 0 &&
             c.indexOf('_') !== 0 &&
             c.indexOf('active') === -1 &&
             c.indexOf('selected') === -1 &&
             c.indexOf('hover') === -1 &&
             c.indexOf('focus') === -1;
    });
    if (classes.length > 0) {
      return tag + '.' + classes.map(tpEscapeSelector).join('.');
    }
  }

  return tag;
}

function tpGetShadowRootChain(element) {
  var chain = [];
  var current = element;
  var isInShadow = false;

  while (current && current !== document.documentElement && current !== document.body) {
    var root = current.getRootNode();
    if (root && root instanceof ShadowRoot) {
      isInShadow = true;
      var host = root.host;
      if (host) {
        chain.unshift(tpGetStableCssSelector(host));
      }
      current = host;
    } else {
      current = current.parentElement;
    }
  }

  return {
    isInShadowDOM: isInShadow,
    hostChain: chain
  };
}

function tpBuildShadowSelectorPath(element) {
  var shadowInfo = tpGetShadowRootChain(element);
  var hostChain = shadowInfo.hostChain;

  if (!shadowInfo.isInShadowDOM || hostChain.length === 0) {
    return {
      isInShadowDOM: false,
      hostChain: [],
      targetSelector: '',
      fullSelector: ''
    };
  }

  var targetSelector = tpGetStableCssSelector(element);
  var fullSelector = hostChain.join(' > ') + ' > ' + targetSelector;

  return {
    isInShadowDOM: true,
    hostChain: hostChain,
    targetSelector: targetSelector,
    fullSelector: fullSelector
  };
}

function tpGeneratePlaywrightShadowLocator(element) {
  var path = tpBuildShadowSelectorPath(element);
  if (!path.isInShadowDOM) return '';

  var locator = 'page';
  path.hostChain.forEach(function (host) {
    locator += ".locator('" + host.replace(/'/g, "\\'") + "')";
  });
  locator += ".locator('" + path.targetSelector.replace(/'/g, "\\'") + "')";
  return locator;
}

function tpEscapeForJava(value) {
  return value.replace(/"/g, '\\"');
}

function tpGenerateSeleniumShadowCode(element) {
  var path = tpBuildShadowSelectorPath(element);
  if (!path.isInShadowDOM) return '';

  var code = 'WebElement target = driver';
  path.hostChain.forEach(function (host, index) {
    code += index === 0
      ? '.findElement(By.cssSelector("' + tpEscapeForJava(host) + '"))'
      : '\n        .findElement(By.cssSelector("' + tpEscapeForJava(host) + '"))';
    code += '\n        .getShadowRoot()';
  });
  code += '\n        .findElement(By.cssSelector("' + tpEscapeForJava(path.targetSelector) + '"));';

  return code;
}
