import decode from "jwt-decode";

class AuthService {
  getProfile() {
    // console.log(this.token)
    try {
      return decode(this.getToken()||"");
    } catch (error) {
      console.log("Error decoding token")
      console.log(error)
    }
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // console.log(token)
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token") || "";
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
