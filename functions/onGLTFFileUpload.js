/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable prefer-promise-reject-errors */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
const os = require("os");
const unzip = require("unzipper");

admin.initializeApp();

const storage = admin.storage();

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "1GB",
};

exports.onGLTFUpload = functions
  .runWith(runtimeOpts)
  .storage.object()
  .onFinalize((object) => {
    console.log("object", object);
    return new Promise((resolve, reject) => {
      if (object.contentType !== "application/x-zip-compressed") {
        reject();
      } else {
        const bucket = storage.bucket(object.bucket);
        const remoteFile = bucket.file(object.name);
        const remoteDir = object.name.replace(".zip", "");

        functions.logger.log(`Downloading ${remoteFile}`);

        remoteFile
          .createReadStream()
          .on("error", (err) => {
            functions.logger.error(err);
            reject(err);
          })
          .on("response", (response) => {
            // Server connected and responded with the specified status and headers.
            functions.logger.log(response);
          })
          .on("end", () => {
            // The file is fully downloaded.
            functions.logger.log("Finished downloading.");
            resolve();
          })
          .pipe(unzip.Parse())
          .on("entry", (entry) => {
            const file = bucket.file(`${remoteDir}/${entry.path}`);

            entry
              .pipe(file.createWriteStream())
              .on("error", (err) => {
                functions.logger.log(err);
                reject(err);
              })
              .on("finish", () => {
                functions.logger.log(
                  `Finsihed extracting ${remoteDir}/${entry.path}`
                );
              });

            entry.autodrain();
          });

        // Delete existing zipped file
        storage.bucket().file(object.name).delete();
      }
    });
  });
