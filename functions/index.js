const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=> {
    return admin.auth().getUserByEmail(data.email).then((user)=> {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin:true, 
        });
    }).then(() => {
        return {
            message: `¡Exito! ${data.email} se ha convertido en administrador`,
          };
    }).catch((err) => {
        console.log(err)
    })
});


const Firestore = admin.firestore;
const db = Firestore();

const axios = require('axios');
const cors = require('cors')({ origin: true });
const googleMapsApyKey = "AIzaSyB0f6SSHpxvgM_b2BuWkfHeNy9ML8pDdGs";


exports.geocodeAddressAndSave = functions.https.onRequest(
    async (request, response) => {
        try {
            const address = request.body.address;
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApyKey}`);

            if (data.status !== "OK") {
                return cors(request, response, () => {
                    response.status(200).send("Sin resultados");
                })
            }

            const geocodedLocation = data.results[0];

            const objGeocodedLocation = {
                address: geocodedLocation.formatted_address,
                geoPoint: new admin.firestore.GeoPoint(geocodedLocation.geometry.location.lat, geocodedLocation.geometry.location.lng)
            }

            await db.collection("locations").add(objGeocodedLocation);
            return cors(request, response, () => {
                response.status(200).send(objGeocodedLocation);
            });


        } catch (error) {
            functions.logger.error(error.message);
            return cors(request, response, () => {
                response.status(500).send();
            });
        }

    }
)