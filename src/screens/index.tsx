//auth
import {Login} from './auth/Login';
import {ForgotPassword} from './auth/ForgotPassword';
import {Splash} from './auth/Splash';

//app
import {SelectCompany} from './app/SelectCompany';
import {ListChat} from './app/ListChat';
import {Setting} from './app/Setting';
import {User} from './app/User';
import {CreateRoomChat} from './app/CreateRoomChat';
import {DetailChat} from './app/DetailChat';
import {InfoRoomChat} from './app/InfoRoomChat';
import {ListUser} from './app/ListUser';
import {EditRoomChat} from './app/EditRoomChat';
import {EditUser} from './app/EditUser';
import {ChangePassword} from './app/ChangePassword';
import {ConfigNoti} from './app/ConfigNoti';
import {ListReaction} from './app/ListReaction';
import {SearchMessage} from './app/SearchMessage';
import {UserSeen} from './app/UserSeen';
import {SettingCompany} from './app/SettingCompany';
import {DetailVideo} from './app/DetailVideo';
import {Bookmark} from './app/Bookmark';
import {NetworkErr} from './app/NetworkErr';
import {ListFileInRoom} from './app/ListFileInRoom';
import {AddGroupFilterChat} from './app/AddGroupFilterChat';
import {Task} from './app/Project/Task';
import {MuteSetting} from './app/MuteSetting';

//Nhóm các màn hình vào 1 file index
const screens = {
  //auth
  Splash,
  Login,
  ForgotPassword,
  //app
  SelectCompany,
  ListChat,
  Setting,
  User,
  CreateRoomChat,
  DetailChat,
  InfoRoomChat,
  ListUser,
  EditRoomChat,
  EditUser,
  ChangePassword,
  ConfigNoti,
  ListReaction,
  SearchMessage,
  UserSeen,
  SettingCompany,
  DetailVideo,
  Bookmark,
  NetworkErr,
  ListFileInRoom,
  AddGroupFilterChat,
  Task,
  MuteSetting,
};

export {screens};
