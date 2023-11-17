import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../components/helpers/Helpers";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SpecificationText from "../components/SpecificationText";
import {
  getProfileFromDb,
  updateProfileInDb,
} from "../services/ProfileService";
import CustomLoading from "../components/custom/CustomLoading";
import ProfileSubpage from "../components/profile/ProfileSubpage";
import EditProfileModal from "../components/modals/EditProfileModal";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [selectedSubpage, setSelectedSubpage] = useState("General");
  const history = useNavigate();
  const authenticated = isAuthenticated();

  const getProfile = () => {
    setLoading(true);
    getProfileFromDb()
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const updateProfile = (profile) => {
    setLoading(true);
    updateProfileInDb(profile)
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!authenticated) history("/");
    let promises = [];
    promises.push(getProfile());
    Promise.all(promises);
  }, [authenticated, history]);

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {edit && (
        <EditProfileModal
          onClose={() => setEdit(false)}
          onSubmit={(profile) => updateProfile(profile)}
        />
      )}
      <div
        style={{
          display: authenticated ? "flex" : "none",
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: "#1f1f1f",
          maxWidth: "80vw",
          borderRadius: "15px",
          padding: "5px",
          margin: "10px",
        }}
      >
        <PageHeader
          headerText={"Profile"}
          button={{
            text: "Edit",
            event: () => setEdit(true),
          }}
        />
        <div
          style={{
            display: "flex",
            padding: "10px 0px 0px 30px",
          }}
        >
          <ProfileSubpage
            subpageText={"General"}
            selected={selectedSubpage}
            onSelect={() => setSelectedSubpage("General")}
          />
          <ProfileSubpage
            subpageText={"Group"}
            selected={selectedSubpage}
            onSelect={() => setSelectedSubpage("Group")}
          />
        </div>
        {selectedSubpage === "General" && (
          <div
            style={{
              padding: "30px 50px 60px 50px",
            }}
          >
            <SpecificationText spec={"Nickname"} value={profile?.username} />
            <SpecificationText spec={"ID"} value={profile?.id} />
            <SpecificationText spec={"Email"} value={profile?.email} />
            <SpecificationText spec={"Password"} value={profile?.username} />
            <SpecificationText spec={"Phone Number"} value={profile?.phone} />
            <SpecificationText
              spec={"2-Factor Auth."}
              value={profile?.twoF_enabled ? "Enabled" : "Disabled"}
            />
          </div>
        )}
        {selectedSubpage === "Group" && (
          <div
            style={{
              padding: "30px 50px 60px 50px",
            }}
          >
            <SpecificationText
              spec={"Groups"}
              value={profile.groups ? profile.groups : "None"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
