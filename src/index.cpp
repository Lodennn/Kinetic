/*1- Create a simple collage software system to control college courses which contains:
• Instructor class that has:
o Attributes: (First Name, Last Name, id, password)
o Methods: (Default and Parameterized Constructors, Setters, Getters,
Print info)
• Student class that has:
o Attributes: (First Name, Last Name, id, password)
o Methods: (Default and Parameterized Constructors, Setters, Getters,
Print info)
• Course class that has:
o Attributes: (Name, id, Instructor, Vector <Student> Students)
o Methods: (Default and Parameterized Constructors, Setters, Getters,
A method to return all students info, Print all course info)*/

#include <iostream>
#include <Vector>
using namespace std;
class person {
protected :
	string firstname;
	string lastname;
	int id;
	string password;
	person(){}
	person(string firstname,string lastname,int id,string password) {
	 this->firstname = firstname;
	 this->lastname = lastname;
	 this->id = id;
	 this->password = password;
 }
 void setfirstname(string firstname) {
	 this->firstname = firstname;
 }
 void setlastname(string lastname) {
	 this->lastname = lastname;
 }
 void setid(int id) {
	 this->id = id;
 }
 void setpassword(string password) {
	 this->password = password;
 }
 string getfirstname() {
	return firstname;
 }
 string getlastname() {
	 return lastname;
 }
 int getid() {
	 return  id;
 }
 string  getpassword() {
	 return password;
 }
 void instractorprintinfo() {
	 cout << " The info: \n" << "INSTRACTOR FIRST NAME IS  :" << getfirstname() << endl;
		 
	 cout << "INSTRACTOR LAST NAME IS :" << getlastname() << endl;
	 cout << " INSTRACTOR ID :" << getid() << endl;
	 cout<< "INSTRACTOR PASSWORD IS " << getpassword() << endl;
 }
};
class Instractor :public person {

};

class student :public person {
public:
	void studentprintInfo() {
		cout << "STUDENT FIRST NAME: " << firstname << endl;
		cout << "STUDENT LAST NAME: " << lastname << endl;
		cout << "STUDENT ID : " << id << endl;
		cout << "STUDENT PASSWORD : " << password << endl;
	}


};

class course  {
private :
	string name;
	int id;
	Instractor inst;
	vector <student> students;
public :
	course() {}
	course(Instractor instractor, vector <student> students)  {
	}
	void setname(string name) {
		this->name = name;
	}
	void setid(int id) {
		this->id = id;
	}
	void setInstractor(Instractor insrtactor) {
		this->inst = insrtactor;
	}
	void setstudents(student s) {
		students.push_back(s);
	}
	string getname() {
		return name;
	}
	int getid() {
		return  id;
	}
	void allstudentsprintinfo() {
		for (int i = 0; i < students.size(); i++) {
			students[i].studentprintInfo();
			cout  << endl;
		}
};
	void allcourseinfo() {
		cout << "COURSE NAME: " << name << endl;
		cout << "COURSE ID: " << id << endl;
		cout << "Instructor Information" << endl;
		inst.instractorprintinfo();
		cout << "Students Information" << endl;
		allstudentsprintinfo();

	}
};

int main()
{
	return 0;
}