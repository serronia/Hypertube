/**use of cryptoByte to hash password */

const sha512 = function(password, salt) {
    const hash = crypto.createHmac(sha512, salt)
    hash.update(password)
    return hash.digest('hex')
}

/**hex pour hexadecimal */

/**generer une string random pour plus de surete cad salt */

const genRanString = function (lenght) {
    return cryptoByte.randomBytes(Math.ceil(lenght/2))
    .toString('hex') /**convert to hex */
    .slice(0, lenght) /**number of character */
    /**return nbr char */
}

module.exports.genRanString = genRanString