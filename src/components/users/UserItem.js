import React from 'react'
import propTypes from 'prop-types';

const UserItem = ({ user: { login, avatar_url, html_url }} ) => {
  // constructor() {
  //   super()
  //   console.log(13)
  //   this.


  // state = {
  //   id: 'id',
  //   login: 'mojombo',
  //   avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  //   html_url: 'https://github.com/mojombo',
  // }

  // const { login, avatar_url, html_url } = props.user

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className="btn btn-dark btn-sm my-1">
          More
        </a>
      </div>
    </div>
  )
};

UserItem.propTypes = {
  user: propTypes.object.isRequired,
}

export default UserItem
