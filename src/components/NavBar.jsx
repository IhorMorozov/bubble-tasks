import '../input.css';
import AvatarButton from "./AvatarButton";

const NavBar = ({user}) =>
	(
		<div id="navbar" className="navbar absolute z-50">
			<div className="flex-1">
				<a href="." className="btn btn-ghost normal-case text-3xl">BubbleTasks</a>
			</div>
			<div className="flex-none gap-4">
				<AvatarButton user={user}/>
			</div>
		</div>
	)

export default NavBar;
