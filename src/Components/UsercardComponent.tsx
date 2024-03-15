import "../styling/Usercard.sass"
import { ReposComponent } from "./ReposComponent";
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';
import { useSelector } from "react-redux";
import { Closebtn } from "./closebutton";
import emptyprofile from "../assets/emptyprofile.jpg";
import { RootState } from "../types";

export const UsercardComponent = ()=>{
    const userSelector = useSelector((state:RootState)=>state.user.userRandomValue);
    
    return <div className="usercard_container">
        <section className="details_section">
            <div className="detail_section_1">
                <div className="avatar_container">
                    <div className="avatar_img_container">
                        <img src={userSelector.avatar_url ?? emptyprofile} alt="avatar" className="avatar_image"/>
                    </div>
                </div>
                <div className="basic_details">
                    <span className="detail">{userSelector.name}</span>
                    <span className="detail">{userSelector.login}</span>
                    <span className="detail"><BusinessIcon/>{userSelector.company ?? '-'}</span>
                    <span className="detail"><MapIcon/>{userSelector.location ?? '-'}</span>
                </div>
            </div>
            <div className="gh_bio">{userSelector.bio ?? '-'}</div>
            <div className="detail_section_2">
                <span className="detail">{userSelector.followers} followers</span>
                <span className="detail">{userSelector.following} following</span>
                <span className="detail">public gists : {userSelector.public_gists}</span>
                <span className="detail">public repos : {userSelector.public_repos}</span>
            </div>
        </section>
        <section className="repos_section">
            <ReposComponent/>
        </section>
        <Closebtn/>
    </div>
}