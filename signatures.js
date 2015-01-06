'use strict';

var bitcore = require('bitcore');
var secp256k1 = require('secp256k1');
var util = require('util');

function checkSignature(){

  var privateKey = new bitcore.PrivateKey();
  var publicKey = privateKey.toPublicKey();
  var publicKeyBuffer = publicKey.toBuffer();
  var message = bitcore.crypto.Random.getRandomBuffer(32);
  var signature = bitcore.crypto.ECDSA.sign(message, privateKey);
  var signatureBuffer = signature.toBuffer();
  
  var valid = secp256k1.verify(publicKeyBuffer, message, signatureBuffer);
  if (!valid) {
    console.log('Signature Failed:');
    console.log('Private Key', privateKey);
    console.log('Public Key', publicKey);
    console.log('Message Hash', message);
    console.log('Signature', signature);
    process.exit();
  }

}
var c = 0;
while (true) {
  checkSignature();
  c++;
  util.print('Verified Private/Public Key Signatures: '+c+ '\r');
}
