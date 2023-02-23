let usuarios = [
  { usuario: 'Mariana', password: 'pass1', saldo: 100 },
  { usuario: 'Vale', password: 'pass2', saldo: 20 },
  { usuario: 'Laura', password: 'pass3', saldo: 200 },
];

document.querySelector('#opciones').style.display = 'none';
document.querySelector('#saldoSeccion').style.display = 'none';
document.querySelector('#ingresarSeccion').style.display = 'none';
document.querySelector('#retirarSeccion').style.display = 'none';

//btn Ingresar Usuario y password
document.querySelector('#btnIngresar').onclick = () => {
  let usuario = document.querySelector('#user').value;
  let passwordCapturado = document.querySelector('#password').value;

  if (passwordCapturado == '' || usuario == '') {
    document.querySelector('#error').innerHTML =
      'Por favor capturar los datos.';
  } else {
    for (var i = 0; i <= usuarios.length; i++) {
      if (
        usuarios[i].usuario == usuario &&
        usuarios[i].password == passwordCapturado
      ) {
        document.querySelector('#bienvenido').innerHTML = `Hola ${usuario}`;

        document.querySelector('#error').style.display = 'none';
        document.querySelector('#opciones').style.display = 'block';
      } else {
        document.querySelector('#error').innerHTML =
          'No se encontró ningún usuario, revisar password.';
      }
    }
  }
};

// btn ConsultarSaldo
document.querySelector('#btnConsultarSaldo').onclick = () => {
  document.querySelector('#saldoSeccion').style.display = 'block';
  document.querySelector('#retirarSeccion').style.display = 'none';
  document.querySelector('#ingresarSeccion').style.display = 'none';
  document.querySelector('#errorSaldo').style.display = 'none';
  obtenerSaldo();
};

// btn IngresarOpcion
document.querySelector('#btnIngresarOpcion').onclick = () => {
  document.querySelector('#saldoSeccion').style.display = 'block';
  document.querySelector('#ingresarSeccion').style.display = 'block';
  document.querySelector('#retirarSeccion').style.display = 'none';
  document.querySelector('#errorSaldo').style.display = 'none';
  obtenerSaldo();
};

//btn RetirarOpcion
document.querySelector('#btnRetirarOpcion').onclick = () => {
  document.querySelector('#saldoSeccion').style.display = 'block';
  document.querySelector('#retirarSeccion').style.display = 'block';
  document.querySelector('#ingresarSeccion').style.display = 'none';
  document.querySelector('#errorSaldo').style.display = 'none';
  obtenerSaldo();
};

//btn IngresarMonto
document.querySelector('#btnIngresarMonto').onclick = () => {
  document.querySelector('#errorSaldo').style.display = 'none';
  let idArray = obtenerIdArray();
  let saldoIngresar = parseFloat(
    document.querySelector('#saldoAIngresar').value
  );

  usuarios[idArray].saldo += saldoIngresar;
  validarReglasNegocio(saldoIngresar, 'ingreso');

  obtenerSaldo();
};

//btn RetirarMonto
document.querySelector('#btnRetirarMonto').onclick = () => {
  document.querySelector('#errorSaldo').style.display = 'none';
  let idArray = obtenerIdArray();
  let saldoARetirar = parseFloat(
    document.querySelector('#saldoARetirar').value
  );

  usuarios[idArray].saldo -= saldoARetirar;
  validarReglasNegocio(saldoARetirar, 'retiro');

  obtenerSaldo();
};

//Funciones

function obtenerSaldo() {
  let id = obtenerIdArray();
  document.querySelector(
    '#saldoDisponible'
  ).innerHTML = ` Tu saldo disponible es: ${usuarios[id].saldo}`;
}

function obtenerIdArray() {
  let usuario = document.querySelector('#user').value;
  for (var i = 0; i <= usuarios.length; i++) {
    if (usuarios[i].usuario == usuario) {
      return i;
    }
  }
}

function validarReglasNegocio(monto, transaccion) {
  let id = obtenerIdArray();

  if (usuarios[id].saldo > 990 || usuarios[id].saldo < 10) {
    document.querySelector('#errorSaldo').style.display = 'block';
    document.querySelector('#errorSaldo').innerHTML =
      'Transacción no realizada. Una cuenta no debe de tener más de $990 y menos de $10.';
    if (transaccion == 'ingreso') {
      usuarios[id].saldo -= monto;
    } else if (transaccion == 'retiro') {
      usuarios[id].saldo += monto;
    }
  }
}
