import Tag from '../models/Tag';
import Post from '../models/Post';
import User from '../models/User';
import config from "../config/app";

export function search(query, page = 1) {
  return Promise.all([
    searchUser(query, page),
    searchTag(query, page),
    searchPost(query, page)
  ]).then(values => values)
    .catch(error => console.log(error));
}

export function searchTag(query, page = 1) {
  return Tag.query((qb) => {
    qb.where('name', 'LIKE', `%${query}%`)
  }).fetchPage({
    page: page,
    pageSize: config.APP_PAGE_LIMIT
  }).then(collection => {
    return {
      data: collection,
      pagination: collection.pagination
    };
  })
}

export function searchPost(query, page = 1) {
  return Post.query((qb) => {
    qb.where('title', 'LIKE', `%${query}%`)
    qb.orWhere('body', 'LIKE', `%${query}%`)
  }).fetchPage({
    page: page,
    pageSize: config.APP_PAGE_LIMIT
  }).then(collection => {
    return {
      data: collection,
      pagination: collection.pagination
    };
  })
}

export function searchUser(query, page = 1) {
  return User.query((qb) => {
    qb.where('name', 'LIKE', `%${query}%`)
  }).fetchPage({
    page: page,
    pageSize: config.APP_PAGE_LIMIT
  }).then(collection => {
    return {
      data: collection,
      pagination: collection.pagination
    };
  })
}
