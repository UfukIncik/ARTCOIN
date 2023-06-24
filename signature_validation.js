const crypto = require('crypto');
const jsrsasign = require('jsrsasign');

// Anahtar çifti oluşturulur
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Özel anahtarla bir mesaj imzalanır
const message = Buffer.from('A piece of art or luxury item', 'utf8');
const sign = crypto.createSign('SHA256');
sign.update(message);
const signature = sign.sign(privateKey, 'hex');

// Genel anahtarla imza doğrulanır
const verify = crypto.createVerify('SHA256');
verify.update(message);
const isSignatureValid = verify.verify(publicKey, signature, 'hex');

if (isSignatureValid) {
  console.log("The signature is valid.");
} else {
  console.log("The signature is not valid.");
}
