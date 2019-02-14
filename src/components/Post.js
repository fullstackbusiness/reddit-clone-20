import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Post extends Component {
  upvote = (user, id) => {
    if (this.props.user._id) {
      fetch(`/api/post/${id}/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Upvoted successfully!
            console.log(res);
            this.props.updateUser(res);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          // this.props.history.push('/?message=failed');
          console.log(err);
        });
    } else {
      console.log('You are not logged in!');
    }
  };
  downvote = (user, id) => {
    if (this.props.user._id) {
      fetch(`/api/post/${id}/downvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Downvoted successfully!
            console.log(res);
            this.props.updateUser(res);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          // this.props.history.push('/?message=failed');
          console.log(err);
        });
    } else {
      console.log('You are not logged in!');
    }
  };

  deletePost = (user, id) => {
    if (this.props.user._id) {
      fetch(`/api/post/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Deleted successfully!
            this.props.deletePost(res);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          // this.props.history.push('/?message=failed');
          console.log(err);
        });
    } else {
      console.log('You are not logged in!');
    }
  };

  render() {
    let {
      title,
      text,
      votes,
      created,
      username,
      upvotedby,
      downvotedby,
      author,
      _id
    } = this.props.post;

    let { upvotes, downvotes } = this.props.user;
    let score = upvotedby.length;
    score = downvotedby.length ? score - downvotedby.length : score;

    return (
      <div className="post">
        <div className="rank">{this.props.rank}</div>
        <div className="votes">
          <div
            className={`arrow up ${
              upvotes && upvotes.includes(_id) ? 'upvoted' : ''
            }`}
            onClick={() => this.upvote(this.props.user, _id)}
          />
          <div className="score">{score ? score : 0}</div>
          <div
            className={`arrow down ${
              downvotes && downvotes.includes(_id) ? 'downvoted' : ''
            }`}
            onClick={() => this.downvote(this.props.user, _id)}
          />
        </div>
        <a href="#" className="thumbnail self" />
        <div className="content">
          <div className="title-area">
            <span className="title">
              {this.props.single ? (
                <span>{title}</span>
              ) : (
                <Link to={`/post/${_id}`}>{title}</Link>
              )}
            </span>
            <span className="url">(self.subreddit)</span>
          </div>
          <div className="meta-area">
            Submitted {moment(created).fromNow()} by {username} to r/cobra
          </div>
          <div className="link-area">
            10 comments{' '}
            {author == this.props.user._id || this.props.user.isAdmin ? (
              <a
                onClick={() => this.deletePost(this.props.user, _id)}
                className="fake-link">
                delete
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
