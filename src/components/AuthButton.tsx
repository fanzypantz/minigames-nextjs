import styles from "../styles/Home.module.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import loadConfig from "next/dist/server/config";
import debounce from "lodash.debounce";

const AuthButton = () => {
  const { user, username } = useContext(UserContext);

  console.log(user);
  console.log(username);

  return (
    <div className={styles.container}>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</div>
  );
};

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <img src="/images/google.png" alt="google logo" /> Sign in with Google
    </button>
  );
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return !username ? (
    <section>
      <h3>Chose Username</h3>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="username" value={formValue} onChange={onChange} />

        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

        <button type="submit" disabled={!isValid}>
          Choose
        </button>

        <h3>Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  ) : (
    <></>
  );
};

function UsernameMessage({ username, isValid, loading }: { username: string; isValid: boolean; loading: boolean }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}

export default AuthButton;
