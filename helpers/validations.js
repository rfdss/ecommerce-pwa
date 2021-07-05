export const isRequired = value => (value ? undefined : '* campo obrigatório');

export const isEmail = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'E-mail inválido';
  }

  return undefined;
};

export const checkPassword = (value, allValues) => {
  const { senha } = allValues;
  return value !== senha ? 'Senhas não conferem' : undefined;
};

export const minLength = (value, min) => {
  if (min > value.length) {
    return false; // `* O campo deve ter pelo menos ${min} caracteres`;
  }

  return true; // undefined;
};

export const checkTime = value => {
  if (!value) return '* campo obrigatório'

  const split = value.split(':')
  const hour = parseInt(split[0])
  const minute = parseInt(split[1])

  if (split[0] != '00' && (hour < 0 || hour > 24)) return '* hora inválida'
  if (split[1] != '00' && (minute < 0 || minute > 59)) return '* minuto inválido'
  
  return undefined
}

export const checkCPF = cpf => {
  cpf = cpf.replace(/[^\d]+/g,'')
  if (cpf == '' || cpf.length != 11) return false

  // Elimina CNPJs invalidos conhecidos
  if (cpf == "00000000000" || 
    cpf == "11111111111" || 
    cpf == "22222222222" || 
    cpf == "33333333333" || 
    cpf == "44444444444" || 
    cpf == "55555555555" || 
    cpf == "66666666666" || 
    cpf == "77777777777" || 
    cpf == "88888888888" || 
    cpf == "99999999999") return false
  
  let sum = 0
  let rest

  for (let i=1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if ((rest == 10) || (rest == 11))  rest = 0
  if (rest != parseInt(cpf.substring(9, 10)) ) return false

  sum = 0
  for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if ((rest == 10) || (rest == 11)) rest = 0
  if (rest != parseInt(cpf.substring(10, 11) ) ) return false

  return true
}

export const checkCNPJ = cnpj => {
  cnpj = cnpj.replace(/[^\d]+/g,'');
  if (cnpj == '' || cnpj.length != 14) return 'CNPJ inválido';

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
    cnpj == "11111111111111" || 
    cnpj == "22222222222222" || 
    cnpj == "33333333333333" || 
    cnpj == "44444444444444" || 
    cnpj == "55555555555555" || 
    cnpj == "66666666666666" || 
    cnpj == "77777777777777" || 
    cnpj == "88888888888888" || 
    cnpj == "99999999999999") return 'CNPJ inválido';
    
  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(0)) return 'CNPJ inválido';

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(1)) return 'CNPJ inválido';

  return true;
}