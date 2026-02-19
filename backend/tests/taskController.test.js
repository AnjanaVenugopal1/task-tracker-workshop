const { getTasks } = require("../controllers/taskController");

describe("Task Controller - getTasks", () => {
  it("should return tasks for authenticated user", async () => {
    const mockReq = {
      user: { id: 1 },
    };

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const mockTasks = [
      { id: 1, title: "Test Task", assigned_to: 1 },
    ];

    const pool = require("../db");
    jest.spyOn(pool, "query").mockResolvedValue({
      rows: mockTasks,
    });

    await getTasks(mockReq, mockRes);

    expect(pool.query).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
  });
});
