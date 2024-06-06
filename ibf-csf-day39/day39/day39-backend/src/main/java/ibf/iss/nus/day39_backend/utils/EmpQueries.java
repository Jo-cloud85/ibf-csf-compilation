package ibf.iss.nus.day39_backend.utils;

public interface EmpQueries {
    public static final String SQL_INSERT_EMPLOYEE = """
        insert into employee (emp_id, firstName, lastName, email, profileURL) values (?, ?, ?, ?, ?)
    """;

    public static final String SQL_GET_ALL_EMPLOYEES = """
        select * from employee
    """;

    public static final String GET_EMPLOYEE_BY_ID = """
        select * from employee where emp_id=?
    """;

    public static final String SQL_UPDATE_EMPLOYEE_BY_ID = """
        update employee set firstName=?, lastName=?, email=?, profileURL=? where emp_id=?
    """;

    public static final String SQL_DELETE_EMPLOYEE_BY_ID = """
        delete from employee where emp_id=?
    """;
}
