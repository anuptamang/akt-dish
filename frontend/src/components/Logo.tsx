import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <>
      <div className="logo text-2xl font-extrabold"><Link to="/" className="text-black block p-2">DishRecipe</Link></div>
    </>
  )
}

export default Logo
