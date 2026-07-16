import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <form action={loginAction} className="space-y-4 max-w-sm">

      <input
        type="email"
        name="email"
        placeholder="Correo"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
      />

      <button>
        Ingresar
      </button>

    </form>
  );
}