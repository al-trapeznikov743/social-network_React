import {ProfileType, PhotosType} from './../reducer/profileReducer';
import {stopSubmit} from 'redux-form'
import {profileAPI} from '../../api/api'
import {
    ADD_POST,
    DELETE_POST,
    SET_AVA_SUCCESS,
    SET_STATUS,
    SET_USER_PROFILE
} from '../types'


// Actions
//------------------------------------------
// addPostActionCreator
// type
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
// action
export const addPost = (newPostText: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newPostText
    }
}

// deletePostActionCreator
// type
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
// action
export const deletePost = (postId: number): DeletePostActionType => {
    return {
        type: DELETE_POST,
        postId
    }
}

// setUserProfileActionCreator
// type
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
// action
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

// setStatusActionCreator
// type
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
// action
const setStatus = (status: string): SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    }
}

// setAvatarActionCreator
// type
type SetAvatarActionType = {
    type: typeof SET_AVA_SUCCESS
    photos: PhotosType
}
const setAvatar = (photos: PhotosType): SetAvatarActionType => {
    return {
        type: SET_AVA_SUCCESS,
        photos
    }
}

// Redux-thunk
//-------------------------------------------------------------
export const getUserProfile = (userId: number) => {
    return async (dispatch: any) => {
        const response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export const getUserStatus = (userId: number) => {
    return async (dispatch: any) => {
        const response = await profileAPI.getUserStatus(userId)
        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        const response = await profileAPI.updateStatus(status)
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export const updateAvatar = (file: any) => {
    return async (dispatch: any) => {
        const response = await profileAPI.updateAvatar(file)
        if(response.data.resultCode === 0) {
            dispatch(setAvatar(response.data.data.photos))
        }
    }
}

export const updateProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId
        const response = await profileAPI.updateProfile(profile)
        if(response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            const errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('editProfile', {_error: errorMessage}))
            return Promise.reject(errorMessage)
        }
    }
}