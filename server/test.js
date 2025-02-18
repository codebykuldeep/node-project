import bcrypt from 'bcrypt';

const p = await bcrypt.hash('123456',3);

console.log(p);


