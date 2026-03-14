import logo from "../assets/Logo.svg"

const logoStyle = {
  width: "150px",
  height: "auto"
}
export default function Logo() {
  return (
    <div style={logoStyle}>
      <img src={logo} />
    </div>
  )
}
