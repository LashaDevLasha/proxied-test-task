import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [registerVisitor, { loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await registerVisitor();

      if (data) {
        Cookies.set("authToken", data.register.token);
        Cookies.set("cartId", data.register.cartId);
        router.push("/");
      }
    } catch (err) {
      console.error("Apollo Client Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
