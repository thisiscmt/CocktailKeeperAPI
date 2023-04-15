import express, {Request, Response} from 'express';
//import multer from 'multer';
import fs from 'fs';
import path from 'path';

import authChecker from '../middleware/authChecker.js';
import * as DataService from '../services/dataService.js';
import * as SharedService from '../services/sharedService.js';
//import { IMAGES_PATH, UPLOADS_PATH, MAX_FILE_UPLOAD } from '../constants/constants.js';

const cocktailRouter = express.Router();

// const upload = multer({
//     limits: {
//         fileSize: 10485760  // 10 MB
//     },
//     storage: uploadStorage
// }).array('files', MAX_FILE_UPLOAD);

cocktailRouter.use(authChecker);

cocktailRouter.get('/backup', async (request: Request, response: Response) => {
    try {
        // const page = request.query.page ? Number(request.query.page) : 1;
        // const pageSize = request.query.pageSize ? Number(request.query.pageSize) : 10;
        // const startDate = request.query.startDate ? SharedService.getDateValue(request.query.startDate.toString()) : undefined;
        // const endDate = request.query.endDate ? SharedService.getDateValue(request.query.endDate.toString()) : undefined;
        // const searchText = request.query.searchText ? request.query.searchText.toString() : undefined;
        //
        // const searchParams = {
        //     page: (page - 1) * pageSize,
        //     pageSize,
        //     startDate,
        //     endDate,
        //     searchText
        // }
        //
        // const hikes = await DataService.getHikes(searchParams);

        response.contentType('application/json');
        response.status(200).send();
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error retrieving cocktail data');
    }
});

// cocktailRouter.get('/:id', async (request, response) => {
//     const hike = await DataService.getHike(request.params.id);
//
//     if (hike) {
//         response.status(200).send(hike);
//     } else {
//         response.status(404).send();
//     }
// });

cocktailRouter.post('/backup', (request: Request, response: Response) => {
    try {
        // const hike = Hike.build({
        //     trail: request.body.trail,
        //     dateOfHike: request.body.dateOfHike,
        //     description: request.body.description,
        //     link: request.body.link,
        //     linkLabel: request.body.linkLabel,
        //     conditions: request.body.conditions,
        //     crowds: request.body.crowds,
        //     tags: request.body.tags ? request.body.tags.toLowerCase() : '',
        //     deleted: false
        // });
        // const hikers = request.body.hikers ? request.body.hikers.split(',') : undefined;
        // const hikeId = await DataService.createHike(hike, hikers);
        //
        // if (request.files && request.files.length > 0) {
        //     try {
        //         fs.mkdirSync(path.join(IMAGES_PATH, hikeId));
        //     } catch (err) {
        //         // TODO: Log this somewhere
        //     }
        //
        //     const files = request.files as Express.Multer.File[];
        //     const photoMetadata = request.body.photos ? JSON.parse(request.body.photos) : new Array<PhotoMetadata>();
        //     const uploadPath = path.join(UPLOADS_PATH, request.fileUploadId);
        //
        //     for (const file of files) {
        //         await SharedService.resizePhoto(path.join(uploadPath, file.originalname), path.join(IMAGES_PATH, hikeId, file.originalname));
        //         await DataService.createPhoto(file.originalname, hikeId, SharedService.getCaption(file.originalname, photoMetadata));
        //     }
        //
        //     fs.rm(uploadPath, { recursive: true }, (error) => {
        //         if (error) {
        //             // TODO: Log this somewhere
        //             console.log(error);
        //         }
        //     });
        // }
        //
        // const hikeRecord = await DataService.getHike(hike.id);
        // await transaction.commit();

        response.status(200).send();
    } catch (error) {
        // TODO: Log this somewhere
        console.log(error);

        response.status(500).send('Error storing cocktail data');
    }
});

// cocktailRouter.put('/:id', uploadChecker, async (request: Request, response: Response) => {
//     upload(request, response, async (error) => {
//         if (error) {
//             // TODO: Log this somewhere
//             console.log(error);
//
//             response.status(500).send('Error uploading files');
//         } else {
//             const transaction = await db.transaction();
//
//             try {
//                 const hike = Hike.build({
//                     id: request.params.id,
//                     trail: request.body.trail,
//                     dateOfHike: request.body.dateOfHike,
//                     description: request.body.description,
//                     link: request.body.link,
//                     linkLabel: request.body.linkLabel,
//                     conditions: request.body.conditions,
//                     crowds: request.body.crowds,
//                     tags: request.body.tags,
//                     deleted: false
//                 });
//
//                 const hikers = request.body.hikers ? request.body.hikers.split(',') : undefined;
//                 await DataService.updateHike(hike, hikers);
//                 const photoMetadata = request.body.photos ? JSON.parse(request.body.photos) : new Array<PhotoMetadata>();
//
//                 if (photoMetadata.length > 0) {
//                     const photoMetadata = JSON.parse(request.body.photos);
//                     const uploadPath = path.join(UPLOADS_PATH, request.fileUploadId);
//                     let uploadFilePath: string;
//                     let photoPath: string;
//                     let hasFile: boolean;
//
//                     for (const metadata of photoMetadata as PhotoMetadata[]) {
//                         uploadFilePath = path.join(uploadPath, metadata.fileName);
//                         photoPath = path.join(IMAGES_PATH, hike.id, metadata.fileName);
//
//                         switch (metadata.action) {
//                             case 'add':
//                                 try {
//                                     fs.mkdirSync(path.join(IMAGES_PATH, hike.id));
//                                 } catch (err) {
//                                     // TODO: Log this somewhere
//                                 }
//
//                                 await SharedService.resizePhoto(uploadFilePath, photoPath);
//                                 await DataService.createPhoto(metadata.fileName, hike.id, metadata.caption);
//
//                                 break;
//                             case 'update':
//                                 hasFile = false;
//
//                                 if (request.files && request.files.length > 0) {
//                                     const files = request.files as Express.Multer.File[];
//                                     hasFile = !!files.find((file: Express.Multer.File) => file.originalname.toLowerCase() === metadata.fileName.toLowerCase())
//                                 }
//
//                                 if (hasFile) {
//                                     fs.unlinkSync(photoPath);
//                                     await SharedService.resizePhoto(uploadFilePath, photoPath);
//                                 }
//
//                                 await DataService.updatePhoto(metadata.id, metadata.caption);
//
//                                 break;
//                             case 'delete':
//                                 await DataService.deletePhoto(metadata.id);
//
//                                 fs.unlink(photoPath, (error) => {
//                                     if (error) {
//                                         // TODO: Log this somewhere
//                                     }
//                                 });
//
//                                 break;
//                         }
//                     }
//
//                     fs.stat(uploadPath, (error) => {
//                         if (!error) {
//                             fs.rm(uploadPath, { recursive: true }, (error) => {
//                                 if (error) {
//                                     // TODO: Log this somewhere
//                                     console.log(error);
//                                 }
//                             });
//                         }
//                     });
//                 }
//
//                 const hikeRecord = await DataService.getHike(hike.id);
//                 await transaction.commit();
//                 response.status(200).send(hikeRecord);
//             } catch (error) {
//                 // TODO: Log this somewhere
//                 console.log(error);
//
//                 await transaction.rollback();
//                 response.status(500).send('Error updating hike');
//             }
//         }
//     });
// });
//
// cocktailRouter.delete('/:id', async (request: Request, response: Response) => {
//     try {
//         if (await DataService.hikeExists(request.params.id)) {
//             const photoPath = path.join(IMAGES_PATH, request.params.id);
//             await DataService.deleteHike(request.params.id);
//
//             fs.rename(photoPath, `${photoPath}_deleted`, (error) => {
//                 if (error) {
//                     // TODO: Log this somewhere
//                 }
//             });
//
//             response.status(204).send();
//         } else {
//             // TODO: Log this somewhere
//             response.status(404).send();
//         }
//     } catch (error) {
//         // TODO: Log this somewhere
//         console.log(error);
//
//         response.status(500).send('Error deleting hike');
//     }
// });

export default cocktailRouter;