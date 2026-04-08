import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")


def read_graph(filename: str) -> tuple[list[list[int]], int]:
    with open(filename, "r") as f:
        n: int = int(f.readline().strip())
        adjacency_list: list[list[int]] = []
        for line in f:
            parts: list[str] = line.strip().split()
            if parts:
                neighbours: list[int] = [int(x) for x in parts[1:]]
                adjacency_list.append(neighbours)
    return adjacency_list, n


def write_neighbours_list(adjacency_list: list[list[int]]) -> None:
    for i, neighbours in enumerate(adjacency_list):
        neighbours_str: str = ", ".join(str(x) for x in neighbours)
        print(f"Sąsiadami wierzchołka {i} są: {neighbours_str}")


def list_to_matrix(adjacency_list: list[list[int]]) -> list[list[int]]:
    n: int = len(adjacency_list)
    matrix: list[list[int]] = [[0] * n for _ in range(n)]
    for i, neighbours in enumerate(adjacency_list):
        for j in neighbours:
            matrix[i][j] = 1
    return matrix


def write_matrix(matrix: list[list[int]]) -> None:
    for row in matrix:
        print(" ".join(str(x) for x in row))


def main() -> None:
    adjacency_list, n = read_graph("graph.txt")

    print("Lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)

    print("\nMacierz sąsiedztwa:")
    matrix: list[list[int]] = list_to_matrix(adjacency_list)
    write_matrix(matrix)


if __name__ == "__main__":
    main()
