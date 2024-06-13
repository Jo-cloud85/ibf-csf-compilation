package ibf.iss.nus.day39_backend.respositories;

public interface Queries {
    public static final String SQL_ADD_EMPLOYEE = """
        INSERT INTO employees(first_name, last_name, email, profile_url)
        VALUES (?,?,?,?);
        """;

    public static final String SQL_GET_ID = """
        SELECT LAST_INSERT_ID()
        """;

    public static final String SQL_GET_EMPLOYEE_BY_ID = """
        SELECT *
        FROM employees
        WHERE id=?
        """;

    public static final String SQL_GET_ALL_EMPLOYEES = """
        SELECT *
        FROM employees
        """;

    public static final String SQL_UPDATE_EMPLOYEE = """
        UPDATE employees
        SET first_name=?, last_name=?, email=?, profile_url=?
        WHERE id=?;
        """;

    public static final String SQL_DELETE_EMPLOYEE = """
        DELETE FROM employees
        WHERE id=?
        """;
}
