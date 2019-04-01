'use strict'

/**
 * params {obj} object
 * {
 *  url,
 *  method,
 *  enctype,
 *  input: {
 *      key: value,
 *      ...
 *  }
 * }
 */
export function downloadExcel(params) {
  let url = '' + params.url;
  let method = params.method || 'post';
  let enctype = params.enctype || 'application/x-www-form-urlencoded';
  // form
  let form = document.createElement('form');
  // input
  if (params.input) {
    let inputBox = document.createElement('div');
    Object.keys(params.input).map(key => {
      let input = document.createElement('input');
      input.type = 'text';
      input.name = key;
      input.setAttribute('value', params.input[key]);
      inputBox.appendChild(input)
    })
    form.appendChild(inputBox);
  }
  // form
  form.id = 'www_form';
  form.name = 'www_form';
  form.enctype = enctype;
  form.style.display = 'none';
  document.body.appendChild(form);
  form.method = method;
  form.action = url;
  // 提交
  form.submit();
  document.body.removeChild(form);
}
