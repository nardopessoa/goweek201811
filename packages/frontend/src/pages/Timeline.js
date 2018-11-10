import React, { Component } from "react";
import "./Timeline.css";
import twitterLogo from "../twitter.svg";
import api from "../services/api";
import Tweet from "../components/Tweet";
import socket from "socket.io-client";

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ""
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get("tweets");
    this.setState({ tweets: response.data });
  }

  handleInputChange = event => {
    this.setState({ newTweet: event.target.value });
  };

  handleNewTweet = async event => {
    if (event.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post("tweets", { content, author });

    this.setState({ newTweet: "" });
  };

  subscribeToEvents = () => {
    const io = socket("http://localhost:3000");

    io.on("tweet", data => {
      this.setState(state => ({ tweets: [data, ...state.tweets] }));
    });
    io.on("like", data => {
      this.setState(state => ({
        tweets: state.tweets.map(
          tweet => (data._id === tweet._id ? data : tweet)
        )
      }));
    });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img src={twitterLogo} alt="GoTwitter" height={24} />

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que esta acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
