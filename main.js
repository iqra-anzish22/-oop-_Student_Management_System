#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(chalk.yellowBright(`balance for ${this.name} : $${this.balance}`));
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.greenBright(`\n$${amount} fees paid successfully for ${this.name}\n`));
        console.log(chalk.yellowBright(`Remaining Balance : $${this.balance}`));
    }
    show_stutas() {
        console.log(chalk.blueBright(`ID: ${this.id}`));
        console.log(chalk.blueBright(`Name: ${this.name}`));
        console.log(chalk.blueBright(`Courses: ${this.courses}`));
        console.log(chalk.blueBright(`Balance: ${this.balance}`));
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.greenBright(`\nstudent: ${name} added successfully. Student  ID ${student.id}\n`));
    }
    enroll_student(student_id, course) {
        let student = this.find_students(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.greenBright(`\n${student.name} enrolled in ${course} successfully\n`));
        }
    }
    view_student_balance(student_id) {
        let student = this.find_students(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red("\nStudent not found. please enter a correct student iD\n"));
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_students(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red("\nStudent not found. please enter a correct student iD\n"));
        }
    }
    show_student_stutas(student_id) {
        let student = this.find_students(student_id);
        if (student) {
            student.show_stutas();
        }
    }
    find_students(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log(chalk.blue("\n \tWelcome to Student Management System\n"));
    console.log("-".repeat(60));
    let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellowBright("Select an option"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "Veiw Student Balance",
                    "Pay fees",
                    "Show Stutas",
                    "Exit"
                ]
            }
        ]);
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        tpye: "input",
                        message: chalk.yellowBright("Enter a Student Name"),
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.yellowBright("Enter a student ID"),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.yellowBright("Enter a course Name"),
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "Veiw Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.yellowBright("Enter a Student ID"),
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.yellowBright("Enter a Student ID"),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.yellowBright("Enter the amount to pay"),
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Stutas":
                let stutas_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.yellowBright("Enter a Student ID"),
                    }
                ]);
                student_manager.show_student_stutas(stutas_input.student_id);
                break;
            case "Exit":
                console.log(chalk.redBright("\nExitong...\n"));
                process.exit();
        }
    }
}
main();
