Practicing React with Chai aur code..
day 2 : react hooks nad fibre




















Problem to implement fractional knapsack in c 

#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int weight;
    int value;
    float ratio;
} Item;

// Comparison function to sort items by value/weight ratio
int compare(const void *a, const void *b) {
    Item *item1 = (Item *)a;
    Item *item2 = (Item *)b;
    if (item2->ratio > item1->ratio) return 1;
    else if (item2->ratio < item1->ratio) return -1;
    else return 0;
}

float fractionalKnapsack(Item items[], int n, int capacity) {
    qsort(items, n, sizeof(Item), compare);

    float totalValue = 0.0;
    for (int i = 0; i < n; i++) {
        if (capacity >= items[i].weight) {
            capacity -= items[i].weight;
            totalValue += items[i].value;
        } else {
            totalValue += items[i].ratio * capacity;
            break;
        }
    }
    return totalValue;
}

int main() {
    int n, capacity;

    printf("Enter number of items: ");
    scanf("%d", &n);
    printf("Enter knapsack capacity: ");
    scanf("%d", &capacity);

    Item items[n];
    for (int i = 0; i < n; i++) {
        printf("Enter value and weight of item %d: ", i + 1);
        scanf("%d %d", &items[i].value, &items[i].weight);
        items[i].ratio = (float)items[i].value / items[i].weight;
    }

    float maxValue = fractionalKnapsack(items, n, capacity);
    printf("Maximum value in knapsack = %.2f\n", maxValue);

    return 0;
}





























ll pair shortest path 

#include <stdio.h>

#define INF 1000000  // Use a large number to represent infinity
#define V 4          // Number of vertices in the graph

void printSolution(int dist[V][V]) {
    printf("Shortest distances between every pair of vertices:\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF)
                printf("%7s", "INF");
            else
                printf("%7d", dist[i][j]);
        }
        printf("\n");
    }
}

void floydWarshall(int graph[V][V]) {
    int dist[V][V];

    // Initialize the solution matrix with input graph
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            dist[i][j] = graph[i][j];

    // Run Floyd-Warshall
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }

    // Print result
    printSolution(dist);
}

int main() {
    int graph[V][V] = {
        {0,   3,   INF, 5},
        {2,   0,   INF, 4},
        {INF, 1,   0,   INF},
        {INF, INF, 2,   0}
    };

    floydWarshall(graph);
    return 0;
}




























Longest common subsequence

#include <stdio.h>
#include <string.h>

#define MAX 100

int max(int a, int b) {
    return (a > b) ? a : b;
}

void lcs(char *X, char *Y, int m, int n) {
    int L[MAX][MAX];

    // Build LCS table in bottom-up fashion
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                L[i][j] = 0;
            else if (X[i - 1] == Y[j - 1])
                L[i][j] = L[i - 1][j - 1] + 1;
            else
                L[i][j] = max(L[i - 1][j], L[i][j - 1]);
        }
    }

    // Length of LCS
    int index = L[m][n];
    char lcsSeq[MAX];
    lcsSeq[index] = '\0'; // Null-terminate the string

    // Reconstruct LCS from the table
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i - 1] == Y[j - 1]) {
            lcsSeq[index - 1] = X[i - 1];
            i--;
            j--;
            index--;
        } else if (L[i - 1][j] > L[i][j - 1])
            i--;
        else
            j--;
    }

    printf("LCS: %s\n", lcsSeq);
    printf("Length of LCS: %d\n", L[m][n]);
}

int main() {
    char X[MAX], Y[MAX];

    printf("Enter first string: ");
    scanf("%s", X);
    printf("Enter second string: ");
    scanf("%s", Y);

    int m = strlen(X);
    int n = strlen(Y);

    lcs(X, Y, m, n);

    return 0;
}




























Graph colouring 



#include <stdio.h>
#include <stdbool.h>

#define V 4  // Number of vertices

// Check if current color assignment is valid for vertex v
bool isSafe(int v, int graph[V][V], int color[], int c) {
    for (int i = 0; i < V; i++)
        if (graph[v][i] && color[i] == c)
            return false;
    return true;
}

// Utility function to solve the problem using backtracking
bool graphColoringUtil(int graph[V][V], int m, int color[], int v) {
    if (v == V)
        return true;

    for (int c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = c;
            if (graphColoringUtil(graph, m, color, v + 1))
                return true;
            color[v] = 0; // backtrack
        }
    }

    return false;
}

// Main function
bool graphColoring(int graph[V][V], int m) {
    int color[V] = {0};

    if (!graphColoringUtil(graph, m, color, 0)) {
        printf("Solution does not exist.\n");
        return false;
    }

    // Print the solution
    printf("Solution Exists: Assigned colors:\n");
    for (int i = 0; i < V; i++)
        printf("Vertex %d --> Color %d\n", i, color[i]);
    return true;
}

int main() {
    // Example graph (adjacency matrix)
    int graph[V][V] = {
        {0, 1, 1, 1},
        {1, 0, 1, 0},
        {1, 1, 0, 1},
        {1, 0, 1, 0}
    };

    int m = 3; // Number of colors

    graphColoring(graph, m);

    return 0;
}































Knutj morris pratt



#include <stdio.h>
#include <string.h>

#define MAX 1000

// Preprocess the pattern to create the LPS array
void computeLPSArray(char *pattern, int M, int lps[]) {
    int len = 0; // Length of the previous longest prefix suffix
    lps[0] = 0;  // lps[0] is always 0
    int i = 1;

    while (i < M) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0)
                len = lps[len - 1];  // Try shorter prefix
            else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

// KMP search algorithm
void KMPSearch(char *pattern, char *text) {
    int M = strlen(pattern);
    int N = strlen(text);

    int lps[M];
    computeLPSArray(pattern, M, lps);

    int i = 0; // index for text[]
    int j = 0; // index for pattern[]

    while (i < N) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }

        if (j == M) {
            printf("Pattern found at index %d\n", i - j);
            j = lps[j - 1];
        } else if (i < N && pattern[j] != text[i]) {
            if (j != 0)
                j = lps[j - 1];
            else
                i++;
        }
    }
}

int main() {
    char text[MAX], pattern[MAX];

    printf("Enter the text: ");
    scanf("%s", text);

    printf("Enter the pattern: ");
    scanf("%s", pattern);

    KMPSearch(pattern, text);

    return 0;
}
