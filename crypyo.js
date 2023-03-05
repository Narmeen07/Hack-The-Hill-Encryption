const { exec } = require('child_process');
const forge = require('node-forge');
const fs = require('fs');
//generate the RSA key
const newHope = forge.pki.rsa.generateKeyPair({bits: 1024});

const privateKeyPem = forge.pki.privateKeyToPem(newHope.privateKey);
const publicKeyPem = forge.pki.publicKeyToPem(newHope.publicKey);


//saving the keys in a file
fs.writeFileSync("public_key.pem", publicKeyPem);
fs.writeFileSync("private_key.pem", privateKeyPem);


exec('openssl pkeyutl -encrypt -in plain.txt -out encrypted.txt -pubin -inkey public_key.pem -keyform PEM -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256 -pkeyopt rsa_mgf1_md:sha256', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

//decryting the message
exec('openssl pkeyutl -decrypt -in encrypted.txt -out decoded.txt -inkey private_key.pem -keyform PEM -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256 -pkeyopt rsa_mgf1_md:sha256', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});