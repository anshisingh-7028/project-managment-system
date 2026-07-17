import {
useTheme
} from "../../../context/ThemeContext";


const AppearanceSettings=()=>{


const {
theme,
toggleTheme
}
=
useTheme();



return (

<div>


<h2 className="
text-3xl
font-bold
text-white
mb-6
">

🎨 Appearance Settings

</h2>



<div className="
grid
md:grid-cols-2
gap-6
">


<button

onClick={toggleTheme}

className="
bg-gradient-to-r
from-blue-600
to-purple-700
p-8
rounded-3xl
text-white
font-bold
text-xl
"

>


{
theme==="dark"
?
"☀️ Switch Light Mode"
:
"🌙 Switch Dark Mode"
}


</button>



</div>


</div>

);


};


export default AppearanceSettings;