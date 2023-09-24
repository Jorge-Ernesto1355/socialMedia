function validateCURP(curp) {
  var e1 = /[A-Z]{1}[AEIOU]{1}[A-Z]{2}/;
  var e2 = /[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])/;
  var e3 = /[HM]{1}/;
  var e4 =
    /(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)/;
  var e5 = /[B-DF-HJ-NP-TV-Z]{3}/;
  var e6 = /[0-9A-Z]{1}[0-9]{1}$/;

  var regex = new RegExp(
    e1.source + e2.source + e3.source + e4.source + e5.source + e6.source,
  );

  return regex.test(curp);
}

export default validateCURP;
