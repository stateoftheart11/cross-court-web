import { put, takeLatest, call, all } from 'redux-saga/effects';

import {
  GET_GALLERY_PHOTOS_INIT,
  GET_GALLERY_PHOTOS_SUCCESS,
  GET_GALLERY_PHOTOS_FAILURE,
} from './actionTypes';
import galleryService from './service';

export function* getGalleryPhotosFlow({ payload }) {
  try {
    const galleryPhotosPayload = yield call(galleryService.getGalleryPhotos, payload);
    yield put({
      type: GET_GALLERY_PHOTOS_SUCCESS,
      payload: {
        galleryPhotos: galleryPhotosPayload.galleryPhotos,
        pagination: galleryPhotosPayload.pagination,
      },
    });
  } catch (err) {
    yield put({ type: GET_GALLERY_PHOTOS_FAILURE, error: err.response.data.error });
  }
}

export default function* gallerySaga() {
  yield all([takeLatest(GET_GALLERY_PHOTOS_INIT, getGalleryPhotosFlow)]);
}
