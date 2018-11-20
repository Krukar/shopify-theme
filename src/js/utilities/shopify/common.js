/* eslint-disable */

/* 
* Shopify Common JS
*
*/

var Shopify = {};

Shopify.bind = function(t, e) {
  return function() {
      return t.apply(e, arguments)
  }
};

// set a given selector with value, if value is one of the options
Shopify.setSelectorByValue = function(t, e) {
  for (var n = 0, i = t.options.length; n < i; n++) {
      var o = t.options[n];
      if (e == o.value || e == o.innerHTML) return t.selectedIndex = n, n
  }
};

// add a callback to an event=
Shopify.addListener = function(t, e, n) {
  t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n)
};

// send request as a POST
Shopify.postLink = function(t, e) {
  e = e || {};
  var n = e.method || "post",
      i = e.parameters || {},
      o = document.createElement("form");
  o.setAttribute("method", n), o.setAttribute("action", t);
  for (var r in i) {
      var l = document.createElement("input");
      l.setAttribute("type", "hidden"), l.setAttribute("name", r), l.setAttribute("value", i[r]), o.appendChild(l)
  }
  document.body.appendChild(o), o.submit(), document.body.removeChild(o)
};

/* CountryProvinceSelector
 * js class that adds listener to country selector and on change updates
 * province selector with valid province values.
 * Selector should be in this format:
 *
 *   <select id="country_selector" name="country" data-default="Canada">
 *     <option data-provinces="['Alberta','Ontario','British Columbia',...] value="Canada">Canada</option>
 *     ...
 *   </select>
 *   <select id="province_selector" name="province" data-default="Ontario">
 *     <option value="Ontario">Ontario</option>
 *     ...
 *   </select> 
 */
Shopify.CountryProvinceSelector = function(t, e, n) {
  this.countryEl = document.getElementById(t), 
  this.provinceEl = document.getElementById(e), 
  this.provinceContainer = document.getElementById(n.hideElement || e), 
  Shopify.addListener(this.countryEl, "change", Shopify.bind(this.countryHandler, this)), 
  this.initCountry(), this.initProvince()
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
      var t = this.countryEl.getAttribute("data-default");
      Shopify.setSelectorByValue(this.countryEl, t), this.countryHandler()
  },
  initProvince: function() {
      var t = this.provinceEl.getAttribute("data-default");
      t && this.provinceEl.options.length > 0 && Shopify.setSelectorByValue(this.provinceEl, t)
  },
  countryHandler: function() {
      var t = this.countryEl.options[this.countryEl.selectedIndex],
          e = t.getAttribute("data-provinces"),
          n = JSON.parse(e);
      if (this.clearOptions(this.provinceEl), n && 0 == n.length) this.provinceContainer.style.display = "none";
      else {
          for (var i = 0; i < n.length; i++) {
              var t = document.createElement("option");
              t.value = n[i][0], t.innerHTML = n[i][1], this.provinceEl.appendChild(t)
          }
          this.provinceContainer.style.display = ""
      }
  },
  clearOptions: function(t) {
      for (; t.firstChild;) t.removeChild(t.firstChild)
  },
  setOptions: function(t, e) {
      var n = 0;
      for (e.length; n < e.length; n++) {
          var i = document.createElement("option");
          i.value = e[n], i.innerHTML = e[n], t.appendChild(i)
      }
  }
};

export default Shopify;