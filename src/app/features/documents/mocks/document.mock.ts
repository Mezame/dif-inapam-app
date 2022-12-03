import { Document } from '../document.interface';

export const documentsMock: Document[] = [
  {
    createDate: '28/11/2022',
    operationCode: 'REPOSICION',
    cardCode: 'P00 0000565',
    fathersLastname: 'Montoya',
    mothersLastname: 'Salazar',
    name: 'Olivia',
    sex: 'M',
    birthdate: '9/21/1959',
    birthplace: 'Veracruz',
    curp: 'MOSO210959ABCDEF00',
    maritalStatus: 'C',
    metadata: {
      id: 1,
    },
  },
  {
    createDate: '30/11/2022',
    operationCode: 'NUEVO REG',
    cardCode: 'P00 0000566',
    fathersLastname: 'Naranjo',
    mothersLastname: 'Villalpando',
    name: 'Matilde',
    sex: 'M',
    birthdate: '11/13/1957',
    birthplace: 'Veracruz',
    curp: 'NAVM131157ABCDEF00',
    maritalStatus: 'S',
    metadata: {
      id: 2,
    },
  },
  {
    createDate: '1/12/2022',
    operationCode: 'NUEVO REG',
    cardCode: 'P00 0000567',
    fathersLastname: 'Escalante',
    mothersLastname: 'Cintrón',
    name: 'Eduardo',
    sex: 'H',
    birthdate: '6/17/1957',
    birthplace: 'Veracruz',
    curp: 'ESCE170657ABCDEF00',
    maritalStatus: 'S',
    metadata: {
      id: 3,
    },
  },
];
