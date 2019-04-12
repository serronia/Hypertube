const Eschtml = require('htmlspecialchars');


const TorrentStream = require('torrent-stream');

const Download = torrentStream('magnet:?xt=urn:btih:4c9d18e1cde6dacd39f6443d76ddba8e7e82a06b&dn=Blade+Runner+2049.HDRip.XviD.AC3-EVO&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969');

Download.on('ready', function () {
    Download.files.forEach(function (file) {
        console.log('filename:', file.name);
        let stream = file.createReadStream();
        // stream is readable stream to containing the file content
    });
});


//╔═════════════════════════════════════════════════════════════════╗
//║ 					    First registration						║
//╚═════════════════════════════════════════════════════════════════╝

const Register = (userNameNsfw, firstNameNsfw, lastNameNsfw, passwordNsfw, confirmedPassNsfw, emailNsfw) => {
    return new Promise((resolve, reject) => {
        if (typeof userNameNsfw !== "string" && typeof firstNameNsfw !== "string" && typeof lastNameNsfw !== "string" &&
            typeof passwordNsfw !== "string" && typeof confirmedPassNsfw !== "string" && typeof emailNsfw !== "string") {
            reject({1: 'missing variable or invalid type'});
        } else if (passwordNsfw !== confirmedPassNsfw) {
            reject({2: 'password and confirmedPass is different'});
        } else {

            // var security
            let userName = Eschtml(userNameNsfw);
            let firstName = Eschtml(firstNameNsfw);
            let lastName = Eschtml(lastNameNsfw);
            let passTmp = Eschtml(passwordNsfw);
            let email = Eschtml(emailNsfw);

            // regex definition
            const userNameRgx = /^[a-z0-9]{2,50}$/i;
            // Minuscule, maj et nombres acceptes, taille de 2 a 50 char

            const nameRgx = /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð]+\.?(([',. -][a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð]\.?)?[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð]*\.?)*[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð]?\.?$/i;
            // Minuscule, maj, nombres et caracteres avec accents acceptes, taille de 2 a 50 char

            const passRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
            // between 8 and 50 characters, at least one uppercase letter, one lowercase letter, one number
            // and one special character

            const emailRgx = /^[a-z0-9._%+-]{1,64}@[a-z0-9._-]+\.[a-z]{2,255}$/i;
            // Minuscule, maj et nombres acceptes, taille de 2 a 255 char


            // testing regex

            if (userNameRgx.test(userName) === false) {
                reject({3: 'invalid userName'});
            } else if (nameRgx.test(firstName) === false) {
                reject({4: 'invalid firstName'});
            } else if (nameRgx.test(lastName) === false) {
                reject({5: 'invalid lastName'});
            } else if (passRgx.test(passTmp) === false) {
                reject({6: 'invalid password'});
            } else if (emailRgx.test(email) === false) {
                reject({7: 'invalid email'});
            } else {
                Connection.connect(null, (err) => {
                    if (err) reject(err);
                    const P1 = new Promise((resolve, reject) => {
                                               Connection.query("SELECT COUNT(*) AS userCount FROM `users` WHERE `userName` = ?", [userName], (err, result) => {
                                                   if (err) reject(err);
                                                   if (result[0].userCount != 0) reject({8: 'userName and/or email already used'});
                                                   else resolve(true);
                                               })
                                           }
                    );
                    const P2 = new Promise((resolve, reject) => {
                                               Connection.query("SELECT COUNT(*) AS emailCount FROM `users` WHERE `email` = ?", [email], (err, result) => {
                                                   if (err) reject(err);
                                                   if (result[0].emailCount != 0) reject({9: 'email already used'});
                                                   else resolve(true);
                                               })
                                           }
                    );
                    Promise.all([P1, P2])
                        .then(() => {

                            let pass = bcrypt.hashSync(passTmp, 10);
                            let validKey = uuidv1();

                            Connection.query("INSERT INTO `users` SET `userName` = ?, `password` =?,`lastName`=?, `firstName`=?,`email`=?,`validKey`=?", [userName, pass, lastName, firstName, email, validKey], (err) => {
                                if (err) reject(err);
                                sendmail({
                                             from: 'kerbault.contact@gmail.com',
                                             to: email,
                                             replyTo: 'kerbault.contact@gmail.com',
                                             subject: 'Welcome on Matcha 💋',
                                             html: 'Welcome on matcha ' + userName + '<br><br>Please click on the following link to verify your mail :<br>' + validKey
                                         }, (err) => {
                                    if (err) reject({10: err});
                                    resolve({0: true});
                                })
                            })
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
            }
        }
    })
};

//╔═════════════════════════════════════════════════════════════════╗
//║ 					   Mail Verification    					║
//╚═════════════════════════════════════════════════════════════════╝

const VerifyAccount = (validKeyNsfw) => {
    return new Promise((resolve, reject) => {
        if (typeof validKeyNsfw !== "string" || validKeyNsfw == '0') {
            reject({1: 'missing variable or invalid type'});
        } else {
            let validKey = Eschtml(validKeyNsfw);

            Connection.connect(null, (err) => {
                if (err) reject(err);
                Connection.query("SELECT COUNT(*) AS isValid FROM `users` WHERE `validKey` = ?", [validKey], (err, result) => {
                    if (err) reject(err);
                    if (result[0].isValid != 1) reject({2: 'Cannot verify account'});
                    else {
                        Connection.query("UPDATE `users` SET `validKey` = '0', `userStatus_ID` = 2 WHERE `validKey` = ?", [validKey], (err) => {
                            if (err) reject(err);
                            else resolve({0: true});
                        })
                    }
                })
            })
        }
    })
};

//╔═════════════════════════════════════════════════════════════════╗
//║ 					   Extended registration    				║
//╚═════════════════════════════════════════════════════════════════╝


// A UTILISER POUR CALL FONCTION

Register("Angel", "Mitena", "Soulstar",
         "Test1234?", "Test1234?", "scrap.kevin@gmail.com").then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
});

// VerifyAccount('f1f0ee60-4b01-11e9-99bc-d7cb8e8bba9a').then(res => {
// 	console.log(res)
// }).catch(err => {
// 	console.log(err)
// });