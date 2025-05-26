/**
 * @constant BUCKET_NAME_MAP
 * @description 存储桶名映射
 */
export const BUCKET_NAME_MAP = {
  CONFIG_FILE: 'config-file'
}

/**
 * @function getMinioBaseUrl
 * @description 获取minio的baseUrl
 * @returns {string} minio的baseUrl
 **/
export const getMinioBaseUrl = () => `${location.protocol}//${location.host}`

/**
 * @function getUploadUrl
 * @description 获取上传文件的url
 * @param {string} bucketName 存储桶名
 * @returns {string} 上传文件的url
 **/
export const getUploadUrl = (bucketName) => `${getMinioBaseUrl()}/djysConfig/file/upload?bucketName=${bucketName}`

/**
 * @function getDownloadUrl
 * @description 获取下载文件的url
 * @param {string} id 文件id
 * @returns {string} 下载文件的url
 **/
export const getDownloadUrl = (id) => `${getMinioBaseUrl()}/djysConfig/file/download?id=${id}`
