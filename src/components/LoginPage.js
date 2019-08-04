import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import { facebookAuthProvider, googleAuthProvider } from "../firebase/firebase";

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Expensify</h1>
          <p>It's time to get your expenses under control. </p>
          <button className="button" onClick={this.props.startLoginWithGoogle}>
            Login with Google
          </button>
          <button
            className="button"
            onClick={this.props.startLoginWithFacebook}
          >
            Login with Facebook
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLoginWithGoogle: () => dispatch(startLogin(googleAuthProvider)),
  startLoginWithFacebook: () => dispatch(startLogin(facebookAuthProvider))
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
