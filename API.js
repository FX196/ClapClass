var config = {
	apiKey: "AIzaSyAQFwlKzWWjfxtw6-7QSLbcgtkmoXuMiq4",
	authDomain: "treehack-e780a.firebaseapp.com",
	databaseURL: "https://treehack-e780a.firebaseio.com",
	projectId: "treehack-e780a",
	storageBucket: "treehack-e780a.appspot.com",
	messagingSenderId: "22555346969",
};
firebase.initializeApp(config);

var all_users_info;
var all_subject_info;

function fetch_all_users() {
  	firebase.database().ref('Username').on('value', function(snapshot){
    	all_users_info = snapshot.val();
  	})
  	firebase.database().ref('Subject').on('value', function(snapshot){
  		all_subjects = snapshot.val();
  	})
}
//Return a list of all users
function get_user_list() {
	var user_list = [];
	for (var key in all_users_info) {
		users.append(key);
	}
	return user_list;
}
//return a list of all subjects
function get_subject_list() {
	var subject_list = [];
	for (var key in all_subjects_info) {
		subject_users.append(key);
	}
	return subject_list;
}
//return the major of a certain user, type String
function get_user_major(user) {
	for (var key in all_users_info) {
		if (key == user) {
			return all_users_info[key];
		}
	}
}

//return a list of users of a certain subject, or an empty list
function get_subject_user(subject) {
	var subject_users = [];
	for (var key in all_subject_info) {
		if (key == subject) {
			for (var user in all_subjects_info[key]) {
				subject_users.append(user);
			}
	    }
	}
	return subject_users;
}
//return a list of all courses a user is taking now, or an empty list
function get_user_courses(user) {
	var course_list = [];
	for (var subject in all_subjects_info) {
		var current_subject_users = get_subject_user(subject);
		if (current_subject_users.includes(user)) {
			course_list.append(all_subjects_info[subject][user]);
		}
	}
	return course_list;
}
//return a list of the courses that user1 and user2 are taking together, or an empty list
function get_same_course(user1, user2) {
	var course_list_user1 = get_user_courses(user1);
	var course_list_user2 = get_user_courses(user2);
	var same_courses = [];
	for(var i = 0; i < course_list_user1.length; i++) {
		for (var j = 0; j < course_list_user2.length; j++) {
			if (course_list_user1[i] == course_list_user2[j]) {
				same_courses.append(course_list_user1[i]);
			}
		}
	}
	return same_courses;
}