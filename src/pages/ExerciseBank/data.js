import { ns, ip, sb } from './utils';
import { migrateExercisesToNewAddressing, initializeCounters } from './addressing';

// Original exercise bank data
const ORIGINAL_EXERCISE_BANK = {
  'Kỹ thuật lập trình': { 
    color: 'blue', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: Con trỏ và bộ nhớ', 
        basic: [
          sb('b1', 'Khai báo con trỏ và in địa chỉ', 'Hiểu khái niệm con trỏ', 8.5, ['pointer']),
          sb('b2', 'Dereference con trỏ', 'Dùng * truy cập giá trị', 8.0, ['dereference']),
          ip('b3', 'Truyền con trỏ vào hàm', 'Pass-by-pointer', ['pointer', 'function']),
          ns('b4', 'Con trỏ và mảng', 'Duyệt mảng bằng con trỏ', ['pointer', 'array']),
          ns('b5', 'Hoán đổi 2 số dùng con trỏ', 'swap + pointer', ['swap', 'pointer']),
          ns('b6', 'Cấp phát động với malloc', 'malloc/free, heap', ['malloc', 'memory']),
          ns('b7', 'Con trỏ hàm cơ bản', 'function pointer', ['function-pointer']),
          ns('b8', 'Mảng con trỏ chuỗi', 'pointer array', ['pointer-array'])
        ], 
        advanced: [
          ns('a1', 'Cài đặt linked list đơn', 'struct+pointer+malloc', ['linked-list', 'mini-project']),
          ns('a2', 'Smart pointer (reference counting)', 'RAII', ['smart-pointer', 'advanced']),
          ns('a3', 'Con trỏ đa cấp và ma trận động', 'double pointer, 2D array', ['double-pointer', 'matrix']),
          ns('a4', 'Memory pool và custom allocator', 'tối ưu memory management', ['memory-pool', 'optimization'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: Struct và File I/O', 
        basic: [
          sb('b1', 'Định nghĩa struct SinhVien', 'struct cơ bản', 7.5, ['struct']),
          sb('b2', 'Khởi tạo và in struct', 'gán và truy cập trường', 8.0, ['struct']),
          ip('b3', 'Đọc file text', 'fopen/fgets/fclose', ['file', 'read']),
          ns('b4', 'Ghi file text', 'fprintf', ['file', 'write']),
          ns('b5', 'Mảng struct và tìm kiếm', 'duyệt+tìm', ['struct', 'search']),
          ns('b6', 'Sắp xếp mảng struct', 'bubble sort', ['struct', 'sort']),
          ns('b7', 'Đọc/ghi struct binary file', 'fread/fwrite', ['file', 'binary']),
          ns('b8', 'Xử lý lỗi file', 'NULL check', ['error-handling'])
        ], 
        advanced: [
          ns('a1', 'Mini project: Quản lý sinh viên từ file', 'CRUD+CSV', ['mini-project', 'crud']),
          ns('a2', 'Nén dữ liệu RLE', 'Run-Length Encoding', ['algorithm', 'compression']),
          ns('a3', 'Database engine đơn giản', 'B-tree indexing', ['database', 'indexing']),
          ns('a4', 'Serialization protocol tùy chỉnh', 'binary format design', ['serialization', 'protocol'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: Thuật toán và cấu trúc dữ liệu', 
        basic: [
          ns('b1', 'Tìm kiếm tuyến tính', 'Linear search trong mảng', ['search', 'linear']),
          ns('b2', 'Tìm kiếm nhị phân', 'Binary search trên mảng đã sắp xếp', ['search', 'binary']),
          ns('b3', 'Bubble Sort', 'Sắp xếp nổi bọt', ['sort', 'bubble']),
          ns('b4', 'Selection Sort', 'Sắp xếp chọn', ['sort', 'selection']),
          ns('b5', 'Stack với mảng', 'LIFO data structure', ['stack', 'array']),
          ns('b6', 'Queue với mảng', 'FIFO data structure', ['queue', 'array']),
          ns('b7', 'Đệ quy cơ bản', 'Factorial, Fibonacci', ['recursion', 'basic']),
          ns('b8', 'Phân tích độ phức tạp', 'Big O notation', ['complexity', 'analysis'])
        ], 
        advanced: [
          ns('a1', 'Quick Sort và Merge Sort', 'Thuật toán sắp xếp hiệu quả', ['sort', 'advanced']),
          ns('a2', 'Hash Table implementation', 'Collision handling', ['hash-table', 'collision']),
          ns('a3', 'Binary Search Tree', 'BST operations', ['bst', 'tree']),
          ns('a4', 'Graph algorithms (DFS/BFS)', 'Traversal algorithms', ['graph', 'traversal'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: Lập trình hướng đối tượng trong C++', 
        basic: [
          ns('b1', 'Class và Object cơ bản', 'Định nghĩa class đầu tiên', ['class', 'object']),
          ns('b2', 'Constructor và Destructor', 'Khởi tạo và hủy đối tượng', ['constructor', 'destructor']),
          ns('b3', 'Access modifiers', 'public, private, protected', ['access', 'modifiers']),
          ns('b4', 'Member functions', 'Phương thức của class', ['methods', 'functions']),
          ns('b5', 'Static members', 'Biến và hàm static', ['static', 'members']),
          ns('b6', 'Friend functions', 'Hàm bạn và class bạn', ['friend', 'functions']),
          ns('b7', 'Operator overloading cơ bản', 'Nạp chồng toán tử', ['operator', 'overloading']),
          ns('b8', 'Copy constructor', 'Sao chép đối tượng', ['copy', 'constructor'])
        ], 
        advanced: [
          ns('a1', 'Inheritance và Polymorphism', 'Kế thừa và đa hình', ['inheritance', 'polymorphism']),
          ns('a2', 'Virtual functions và Abstract classes', 'Hàm ảo và lớp trừu tượng', ['virtual', 'abstract']),
          ns('a3', 'Template programming', 'Lập trình generic', ['template', 'generic']),
          ns('a4', 'STL containers và algorithms', 'Standard Template Library', ['stl', 'containers'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: Xử lý chuỗi và Regular Expression', 
        basic: [
          ns('b1', 'Thao tác chuỗi cơ bản', 'strlen, strcpy, strcat', ['string', 'basic']),
          ns('b2', 'So sánh và tìm kiếm chuỗi', 'strcmp, strstr', ['string', 'search']),
          ns('b3', 'Chuyển đổi kiểu dữ liệu', 'atoi, itoa, sprintf', ['conversion', 'parsing']),
          ns('b4', 'Xử lý chuỗi Unicode', 'UTF-8, wide characters', ['unicode', 'utf8']),
          ns('b5', 'String tokenization', 'strtok, split functions', ['tokenization', 'split']),
          ns('b6', 'Pattern matching cơ bản', 'Wildcard matching', ['pattern', 'matching']),
          ns('b7', 'Regular Expression syntax', 'Cú pháp regex cơ bản', ['regex', 'syntax']),
          ns('b8', 'Validation với regex', 'Email, phone validation', ['validation', 'regex'])
        ], 
        advanced: [
          ns('a1', 'Regex engine implementation', 'Finite State Machine', ['regex', 'engine']),
          ns('a2', 'Text processing algorithms', 'KMP, Boyer-Moore', ['text', 'algorithms']),
          ns('a3', 'Lexical analyzer', 'Tokenizer cho compiler', ['lexer', 'compiler']),
          ns('a4', 'String compression algorithms', 'LZ77, Huffman coding', ['compression', 'algorithms'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Lập trình mạng và Socket', 
        basic: [
          ns('b1', 'Socket programming cơ bản', 'TCP client-server', ['socket', 'tcp']),
          ns('b2', 'UDP communication', 'Connectionless protocol', ['udp', 'datagram']),
          ns('b3', 'HTTP client implementation', 'GET/POST requests', ['http', 'client']),
          ns('b4', 'Multi-threading server', 'Concurrent connections', ['threading', 'server']),
          ns('b5', 'Network byte order', 'Endianness handling', ['network', 'endian']),
          ns('b6', 'Error handling trong network', 'Timeout, retry logic', ['error', 'network']),
          ns('b7', 'Simple chat application', 'Real-time messaging', ['chat', 'realtime']),
          ns('b8', 'File transfer protocol', 'FTP-like implementation', ['file', 'transfer'])
        ], 
        advanced: [
          ns('a1', 'Asynchronous I/O', 'select, poll, epoll', ['async', 'io']),
          ns('a2', 'SSL/TLS implementation', 'Secure communication', ['ssl', 'security']),
          ns('a3', 'Load balancer', 'Traffic distribution', ['load', 'balancer']),
          ns('a4', 'Network protocol design', 'Custom protocol implementation', ['protocol', 'design'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: Cấu trúc dữ liệu nâng cao', 
        basic: [
          ns('b1', 'Linked List variants', 'Doubly, Circular linked list', ['linked-list', 'variants']),
          ns('b2', 'Stack và Queue với linked list', 'Dynamic implementation', ['stack', 'queue']),
          ns('b3', 'Binary Tree traversal', 'Inorder, Preorder, Postorder', ['tree', 'traversal']),
          ns('b4', 'Heap data structure', 'Min-heap, Max-heap', ['heap', 'priority']),
          ns('b5', 'Trie (Prefix Tree)', 'String search optimization', ['trie', 'prefix']),
          ns('b6', 'Disjoint Set (Union-Find)', 'Connected components', ['union-find', 'disjoint']),
          ns('b7', 'Segment Tree cơ bản', 'Range query optimization', ['segment-tree', 'range']),
          ns('b8', 'Fenwick Tree (BIT)', 'Binary Indexed Tree', ['fenwick', 'bit'])
        ], 
        advanced: [
          ns('a1', 'AVL Tree và Red-Black Tree', 'Self-balancing BST', ['avl', 'red-black']),
          ns('a2', 'B-Tree và B+ Tree', 'Database indexing structures', ['btree', 'database']),
          ns('a3', 'Skip List', 'Probabilistic data structure', ['skip-list', 'probabilistic']),
          ns('a4', 'Persistent data structures', 'Immutable versions', ['persistent', 'immutable'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Thuật toán đồ thị', 
        basic: [
          ns('b1', 'Graph representation', 'Adjacency matrix, list', ['graph', 'representation']),
          ns('b2', 'DFS và BFS implementation', 'Depth-first, Breadth-first', ['dfs', 'bfs']),
          ns('b3', 'Shortest path - Dijkstra', 'Single source shortest path', ['dijkstra', 'shortest']),
          ns('b4', 'Minimum Spanning Tree', 'Kruskal, Prim algorithms', ['mst', 'spanning']),
          ns('b5', 'Topological sorting', 'DAG ordering', ['topological', 'dag']),
          ns('b6', 'Cycle detection', 'Directed và undirected graphs', ['cycle', 'detection']),
          ns('b7', 'Connected components', 'Finding graph components', ['components', 'connectivity']),
          ns('b8', 'Bipartite graph checking', 'Two-coloring algorithm', ['bipartite', 'coloring'])
        ], 
        advanced: [
          ns('a1', 'Floyd-Warshall algorithm', 'All pairs shortest path', ['floyd-warshall', 'apsp']),
          ns('a2', 'Network flow algorithms', 'Max flow, Min cut', ['network-flow', 'maxflow']),
          ns('a3', 'Strongly connected components', 'Tarjan, Kosaraju algorithms', ['scc', 'tarjan']),
          ns('a4', 'Graph coloring và matching', 'Vertex coloring, bipartite matching', ['coloring', 'matching'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Thuật toán tối ưu hóa', 
        basic: [
          ns('b1', 'Greedy algorithms', 'Activity selection, coin change', ['greedy', 'optimization']),
          ns('b2', 'Dynamic Programming cơ bản', 'Fibonacci, LCS', ['dp', 'basic']),
          ns('b3', 'Knapsack problem', '0/1 và unbounded knapsack', ['knapsack', 'dp']),
          ns('b4', 'Longest Common Subsequence', 'String DP problem', ['lcs', 'string']),
          ns('b5', 'Edit distance', 'Levenshtein distance', ['edit-distance', 'string']),
          ns('b6', 'Backtracking cơ bản', 'N-Queens, Sudoku solver', ['backtracking', 'search']),
          ns('b7', 'Branch and Bound', 'Optimization với pruning', ['branch-bound', 'pruning']),
          ns('b8', 'Divide and Conquer', 'Merge sort, quick select', ['divide-conquer', 'recursive'])
        ], 
        advanced: [
          ns('a1', 'Advanced DP patterns', 'Bitmask DP, Tree DP', ['dp', 'advanced']),
          ns('a2', 'Linear Programming', 'Simplex method basics', ['linear-programming', 'simplex']),
          ns('a3', 'Approximation algorithms', 'TSP, Set Cover approximation', ['approximation', 'tsp']),
          ns('a4', 'Metaheuristic algorithms', 'Genetic Algorithm, Simulated Annealing', ['metaheuristic', 'genetic'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Lập trình hệ thống', 
        basic: [
          ns('b1', 'Process và Thread', 'fork, pthread basics', ['process', 'thread']),
          ns('b2', 'Inter-Process Communication', 'Pipe, shared memory', ['ipc', 'communication']),
          ns('b3', 'Synchronization primitives', 'Mutex, semaphore', ['sync', 'mutex']),
          ns('b4', 'Memory management', 'Virtual memory, paging', ['memory', 'virtual']),
          ns('b5', 'File system operations', 'System calls, file descriptors', ['filesystem', 'syscall']),
          ns('b6', 'Signal handling', 'UNIX signals', ['signal', 'unix']),
          ns('b7', 'Device I/O programming', 'Hardware interaction', ['device', 'io']),
          ns('b8', 'Performance profiling', 'CPU, memory profiling', ['profiling', 'performance'])
        ], 
        advanced: [
          ns('a1', 'Kernel module development', 'Linux kernel programming', ['kernel', 'module']),
          ns('a2', 'Real-time systems', 'RTOS programming', ['realtime', 'rtos']),
          ns('a3', 'Distributed systems basics', 'Consensus algorithms', ['distributed', 'consensus']),
          ns('a4', 'Embedded systems programming', 'Microcontroller programming', ['embedded', 'microcontroller'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Dự án tổng hợp', 
        basic: [
          ns('b1', 'Mini compiler design', 'Lexer + Parser cơ bản', ['compiler', 'lexer']),
          ns('b2', 'Database engine mini', 'Simple SQL interpreter', ['database', 'sql']),
          ns('b3', 'Web server implementation', 'HTTP server từ scratch', ['webserver', 'http']),
          ns('b4', 'Game engine 2D', 'Simple graphics engine', ['game', 'graphics']),
          ns('b5', 'Operating system kernel', 'Bootloader + basic kernel', ['os', 'kernel']),
          ns('b6', 'Network protocol stack', 'TCP/IP implementation', ['network', 'tcpip']),
          ns('b7', 'Distributed file system', 'Simple DFS', ['distributed', 'filesystem']),
          ns('b8', 'Machine learning library', 'Basic ML algorithms', ['ml', 'algorithms'])
        ], 
        advanced: [
          ns('a1', 'Full-stack web framework', 'MVC framework từ scratch', ['framework', 'mvc']),
          ns('a2', 'Blockchain implementation', 'Cryptocurrency basics', ['blockchain', 'crypto']),
          ns('a3', 'AI game engine', 'Game AI với minimax', ['ai', 'game']),
          ns('a4', 'High-performance computing', 'Parallel algorithms', ['hpc', 'parallel'])
        ] 
      },
    ]
  },
  'Lập trình hướng đối tượng': { 
    color: 'purple', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: Biến và kiểu dữ liệu trong C#', 
        basic: [
          sb('b1', 'Write Line', 'Console.WriteLine()', 9.0, ['console', 'output']),
          sb('b2', 'Khai báo biến C#', 'int,double,string,bool', 8.5, ['variables', 'types']),
          ip('b3', 'Toán tử số học', 'cộng trừ nhân chia %', ['arithmetic']),
          ns('b4', 'Nối chuỗi và ký tự thoát', '+ nối chuỗi, \\n \\t', ['string', 'escape']),
          ns('b5', 'Nội suy chuỗi', '$"..." interpolation', ['interpolation']),
          ns('b6', 'ToUpper, ToLower, Length', 'string methods', ['string', 'methods']),
          ns('b7', 'IndexOf, Substring, []', 'cắt và tìm chuỗi', ['string', 'indexof']),
          ns('b8', 'Math.Pow, Sqrt, ReadLine', 'math+input', ['math', 'input'])
        ], 
        advanced: [
          ns('a1', 'Kết hợp Unary và xử lý chuỗi phức tạp', '++,--,+=', ['unary', 'advanced']),
          ns('a2', 'Mini project: Phân tích văn bản', 'đếm từ, đảo ngược', ['mini-project', 'string']),
          ns('a3', 'Regular Expression engine', 'pattern matching', ['regex', 'parsing']),
          ns('a4', 'String interning và optimization', 'memory efficiency', ['optimization', 'interning'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: Class và Object', 
        basic: [
          ns('b1', 'Định nghĩa class đơn giản', 'class Person với properties', ['class', 'basic']),
          ns('b2', 'Constructor và Destructor', 'Khởi tạo và hủy object', ['constructor', 'destructor']),
          ns('b3', 'Properties và Fields', 'get/set accessors', ['properties', 'fields']),
          ns('b4', 'Methods và Parameters', 'Instance methods', ['methods', 'parameters']),
          ns('b5', 'Static members', 'Static fields và methods', ['static', 'members']),
          ns('b6', 'Access modifiers', 'public, private, protected', ['access', 'modifiers']),
          ns('b7', 'Object initialization', 'Object initializer syntax', ['initialization', 'syntax']),
          ns('b8', 'ToString() override', 'Custom string representation', ['tostring', 'override'])
        ], 
        advanced: [
          ns('a1', 'Inheritance và Polymorphism', 'Base class, virtual methods', ['inheritance', 'polymorphism']),
          ns('a2', 'Abstract classes và Interfaces', 'Contract-based programming', ['abstract', 'interface']),
          ns('a3', 'Generic classes và methods', 'Type parameters', ['generics', 'types']),
          ns('a4', 'Design patterns (Factory, Observer)', 'Common OOP patterns', ['design-patterns', 'factory'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: Collections và LINQ', 
        basic: [
          ns('b1', 'List<T> operations', 'Add, Remove, Find', ['list', 'operations']),
          ns('b2', 'Dictionary<K,V>', 'Key-value pairs', ['dictionary', 'keyvalue']),
          ns('b3', 'Array vs List', 'Fixed vs dynamic size', ['array', 'list']),
          ns('b4', 'foreach loops', 'Iteration over collections', ['foreach', 'iteration']),
          ns('b5', 'LINQ Where và Select', 'Basic filtering và projection', ['linq', 'where']),
          ns('b6', 'LINQ OrderBy', 'Sorting collections', ['linq', 'orderby']),
          ns('b7', 'LINQ GroupBy', 'Grouping data', ['linq', 'groupby']),
          ns('b8', 'LINQ Aggregate functions', 'Sum, Count, Average', ['linq', 'aggregate'])
        ], 
        advanced: [
          ns('a1', 'Custom LINQ extensions', 'Extension methods', ['linq', 'extensions']),
          ns('a2', 'IEnumerable vs IQueryable', 'Deferred execution', ['ienumerable', 'iqueryable']),
          ns('a3', 'Parallel LINQ (PLINQ)', 'Multi-threading với LINQ', ['plinq', 'parallel']),
          ns('a4', 'Expression trees', 'Dynamic query building', ['expression', 'trees'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: Exception Handling và Debugging', 
        basic: [
          ns('b1', 'Try-catch-finally blocks', 'Exception handling cơ bản', ['exception', 'try-catch']),
          ns('b2', 'Custom exceptions', 'Tạo exception class riêng', ['custom', 'exception']),
          ns('b3', 'Exception propagation', 'Throw và rethrow', ['throw', 'propagation']),
          ns('b4', 'Using statement', 'Resource management', ['using', 'dispose']),
          ns('b5', 'Debugging techniques', 'Breakpoints, watch windows', ['debugging', 'breakpoint']),
          ns('b6', 'Logging frameworks', 'NLog, Serilog basics', ['logging', 'framework']),
          ns('b7', 'Unit testing cơ bản', 'MSTest, NUnit', ['testing', 'unit']),
          ns('b8', 'Code analysis tools', 'Static analysis', ['analysis', 'static'])
        ], 
        advanced: [
          ns('a1', 'Advanced debugging', 'Memory dumps, performance profiling', ['debugging', 'advanced']),
          ns('a2', 'Structured logging', 'Semantic logging patterns', ['logging', 'structured']),
          ns('a3', 'Test-driven development', 'TDD methodology', ['tdd', 'methodology']),
          ns('a4', 'Performance testing', 'Load testing, benchmarking', ['performance', 'testing'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: File I/O và Serialization', 
        basic: [
          ns('b1', 'File và Directory operations', 'File.ReadAllText, Directory.GetFiles', ['file', 'directory']),
          ns('b2', 'Stream programming', 'FileStream, MemoryStream', ['stream', 'io']),
          ns('b3', 'Text file processing', 'StreamReader, StreamWriter', ['text', 'processing']),
          ns('b4', 'Binary file handling', 'BinaryReader, BinaryWriter', ['binary', 'file']),
          ns('b5', 'JSON serialization', 'Newtonsoft.Json, System.Text.Json', ['json', 'serialization']),
          ns('b6', 'XML processing', 'XDocument, XmlDocument', ['xml', 'processing']),
          ns('b7', 'CSV file handling', 'Parsing và writing CSV', ['csv', 'parsing']),
          ns('b8', 'Configuration files', 'app.config, appsettings.json', ['config', 'settings'])
        ], 
        advanced: [
          ns('a1', 'Custom serialization', 'ISerializable interface', ['serialization', 'custom']),
          ns('a2', 'Async file operations', 'async/await với file I/O', ['async', 'file']),
          ns('a3', 'Memory-mapped files', 'Large file processing', ['memory-mapped', 'large-files']),
          ns('a4', 'File system monitoring', 'FileSystemWatcher', ['monitoring', 'filesystem'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Delegates và Events', 
        basic: [
          ns('b1', 'Delegate declaration', 'Khai báo và sử dụng delegate', ['delegate', 'declaration']),
          ns('b2', 'Multicast delegates', 'Combining delegates', ['multicast', 'delegate']),
          ns('b3', 'Anonymous methods', 'delegate() syntax', ['anonymous', 'methods']),
          ns('b4', 'Lambda expressions', '=> syntax', ['lambda', 'expressions']),
          ns('b5', 'Func và Action delegates', 'Built-in delegate types', ['func', 'action']),
          ns('b6', 'Event declaration', 'Publisher-subscriber pattern', ['event', 'publisher']),
          ns('b7', 'Event handling', 'Subscribe và unsubscribe', ['event', 'handling']),
          ns('b8', 'Custom event args', 'EventArgs inheritance', ['eventargs', 'custom'])
        ], 
        advanced: [
          ns('a1', 'Weak event patterns', 'Memory leak prevention', ['weak', 'events']),
          ns('a2', 'Async event handling', 'Task-based events', ['async', 'events']),
          ns('a3', 'Event aggregator pattern', 'Decoupled messaging', ['aggregator', 'messaging']),
          ns('a4', 'Reactive extensions (Rx)', 'Observable patterns', ['reactive', 'observable'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: Multithreading và Async Programming', 
        basic: [
          ns('b1', 'Thread class basics', 'Creating và starting threads', ['thread', 'basics']),
          ns('b2', 'Thread synchronization', 'lock, Monitor', ['synchronization', 'lock']),
          ns('b3', 'ThreadPool usage', 'Background thread management', ['threadpool', 'background']),
          ns('b4', 'Task class', 'Task.Run, Task.Factory', ['task', 'parallel']),
          ns('b5', 'async/await pattern', 'Asynchronous programming', ['async', 'await']),
          ns('b6', 'CancellationToken', 'Cooperative cancellation', ['cancellation', 'token']),
          ns('b7', 'Parallel.For và PLINQ', 'Data parallelism', ['parallel', 'plinq']),
          ns('b8', 'Thread-safe collections', 'ConcurrentQueue, ConcurrentDictionary', ['concurrent', 'collections'])
        ], 
        advanced: [
          ns('a1', 'Advanced synchronization', 'Semaphore, ReaderWriterLock', ['synchronization', 'advanced']),
          ns('a2', 'Custom task schedulers', 'TaskScheduler implementation', ['scheduler', 'custom']),
          ns('a3', 'Lock-free programming', 'Interlocked operations', ['lockfree', 'interlocked']),
          ns('a4', 'Actor model implementation', 'Message-passing concurrency', ['actor', 'messaging'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Reflection và Attributes', 
        basic: [
          ns('b1', 'Type information', 'typeof, GetType()', ['type', 'reflection']),
          ns('b2', 'Assembly loading', 'Assembly.LoadFrom', ['assembly', 'loading']),
          ns('b3', 'Member information', 'MethodInfo, PropertyInfo', ['member', 'info']),
          ns('b4', 'Dynamic invocation', 'Invoke methods dynamically', ['dynamic', 'invocation']),
          ns('b5', 'Attribute basics', 'Creating custom attributes', ['attribute', 'custom']),
          ns('b6', 'Attribute reflection', 'GetCustomAttributes', ['attribute', 'reflection']),
          ns('b7', 'Expression trees', 'Compile-time code generation', ['expression', 'trees']),
          ns('b8', 'Dynamic type creation', 'Emit và CodeDom', ['dynamic', 'emit'])
        ], 
        advanced: [
          ns('a1', 'IL generation', 'Intermediate Language programming', ['il', 'generation']),
          ns('a2', 'Proxy pattern implementation', 'Dynamic proxies', ['proxy', 'dynamic']),
          ns('a3', 'Plugin architecture', 'MEF, dependency injection', ['plugin', 'mef']),
          ns('a4', 'Code analysis tools', 'Roslyn analyzers', ['roslyn', 'analyzers'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Database Programming', 
        basic: [
          ns('b1', 'ADO.NET basics', 'SqlConnection, SqlCommand', ['adonet', 'connection']),
          ns('b2', 'DataReader usage', 'Forward-only data access', ['datareader', 'forward']),
          ns('b3', 'DataSet và DataTable', 'Disconnected data access', ['dataset', 'datatable']),
          ns('b4', 'Parameterized queries', 'SQL injection prevention', ['parameters', 'injection']),
          ns('b5', 'Entity Framework basics', 'Code-first approach', ['ef', 'codefirst']),
          ns('b6', 'LINQ to Entities', 'Querying với EF', ['linq', 'entities']),
          ns('b7', 'Database migrations', 'Schema versioning', ['migrations', 'schema']),
          ns('b8', 'Connection pooling', 'Performance optimization', ['pooling', 'performance'])
        ], 
        advanced: [
          ns('a1', 'Advanced EF features', 'Lazy loading, change tracking', ['ef', 'advanced']),
          ns('a2', 'Custom data providers', 'ADO.NET provider model', ['provider', 'custom']),
          ns('a3', 'NoSQL integration', 'MongoDB, Redis với C#', ['nosql', 'mongodb']),
          ns('a4', 'Database performance tuning', 'Query optimization', ['performance', 'tuning'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Web Development với ASP.NET', 
        basic: [
          ns('b1', 'ASP.NET Core basics', 'MVC pattern', ['aspnet', 'mvc']),
          ns('b2', 'Controllers và Actions', 'HTTP request handling', ['controller', 'action']),
          ns('b3', 'Views và Razor syntax', 'HTML generation', ['view', 'razor']),
          ns('b4', 'Models và data binding', 'Form processing', ['model', 'binding']),
          ns('b5', 'Routing configuration', 'URL mapping', ['routing', 'url']),
          ns('b6', 'Middleware pipeline', 'Request processing', ['middleware', 'pipeline']),
          ns('b7', 'Dependency injection', 'IoC container', ['di', 'ioc']),
          ns('b8', 'Configuration management', 'appsettings, environment variables', ['config', 'environment'])
        ], 
        advanced: [
          ns('a1', 'Web API development', 'RESTful services', ['webapi', 'rest']),
          ns('a2', 'Authentication và Authorization', 'Identity, JWT', ['auth', 'identity']),
          ns('a3', 'SignalR real-time communication', 'WebSockets, Server-Sent Events', ['signalr', 'realtime']),
          ns('a4', 'Performance optimization', 'Caching, compression', ['performance', 'caching'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Advanced Topics và Best Practices', 
        basic: [
          ns('b1', 'Memory management', 'GC, IDisposable pattern', ['memory', 'gc']),
          ns('b2', 'Performance profiling', 'dotTrace, PerfView', ['profiling', 'performance']),
          ns('b3', 'Code quality tools', 'SonarQube, StyleCop', ['quality', 'tools']),
          ns('b4', 'Design patterns implementation', 'Singleton, Factory, Observer', ['patterns', 'implementation']),
          ns('b5', 'SOLID principles', 'Clean code practices', ['solid', 'clean']),
          ns('b6', 'Microservices basics', 'Service decomposition', ['microservices', 'decomposition']),
          ns('b7', 'Docker containerization', '.NET trong containers', ['docker', 'containers']),
          ns('b8', 'CI/CD pipelines', 'Azure DevOps, GitHub Actions', ['cicd', 'devops'])
        ], 
        advanced: [
          ns('a1', 'Advanced .NET internals', 'CLR, JIT compilation', ['internals', 'clr']),
          ns('a2', 'High-performance computing', 'Span<T>, Memory<T>', ['hpc', 'span']),
          ns('a3', 'Cross-platform development', '.NET 5+, Xamarin', ['crossplatform', 'xamarin']),
          ns('a4', 'Cloud-native development', 'Azure Functions, serverless', ['cloud', 'serverless'])
        ] 
      },
    ]
  },
  'Lập trình Back-end': { 
    color: 'green', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: REST API cơ bản', 
        basic: [
          sb('b1', 'Express.js Hello World', 'Node.js+Express', 9.0, ['nodejs', 'express']),
          sb('b2', 'Route GET /users', 'JSON response', 8.5, ['route', 'get']),
          ip('b3', 'Route POST nhận body', 'express.json()', ['route', 'post']),
          ns('b4', 'PUT và DELETE /users/:id', 'CRUD routes', ['put', 'delete']),
          ns('b5', 'Middleware JWT', 'Bearer token', ['jwt', 'auth']),
          ns('b6', 'MongoDB với Mongoose', 'Schema+Model', ['mongodb']),
          ns('b7', 'Validation với Joi', 'validate body', ['validation']),
          ns('b8', 'Error handling middleware', 'centralized error', ['error-handling'])
        ], 
        advanced: [
          ns('a1', 'Mini project: Task API', 'Auth+CRUD+MongoDB', ['mini-project', 'rest-api']),
          ns('a2', 'WebSocket real-time chat', 'Socket.io', ['websocket', 'advanced']),
          ns('a3', 'GraphQL API với subscriptions', 'real-time data', ['graphql', 'subscriptions']),
          ns('a4', 'Microservices với Docker', 'containerization', ['microservices', 'docker'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: Database và ORM', 
        basic: [
          ns('b1', 'SQL cơ bản', 'SELECT, INSERT, UPDATE, DELETE', ['sql', 'basic']),
          ns('b2', 'JOIN operations', 'INNER, LEFT, RIGHT JOIN', ['sql', 'join']),
          ns('b3', 'Sequelize setup', 'ORM configuration', ['sequelize', 'setup']),
          ns('b4', 'Model definitions', 'Define tables với Sequelize', ['sequelize', 'models']),
          ns('b5', 'Associations', 'hasMany, belongsTo relationships', ['sequelize', 'associations']),
          ns('b6', 'Migrations', 'Database schema versioning', ['sequelize', 'migrations']),
          ns('b7', 'Seeders', 'Initial data population', ['sequelize', 'seeders']),
          ns('b8', 'Query optimization', 'Indexes và performance', ['sql', 'optimization'])
        ], 
        advanced: [
          ns('a1', 'Database transactions', 'ACID properties', ['database', 'transactions']),
          ns('a2', 'Connection pooling', 'Optimize database connections', ['database', 'pooling']),
          ns('a3', 'Database replication', 'Master-slave setup', ['database', 'replication']),
          ns('a4', 'NoSQL với Redis', 'Caching strategies', ['redis', 'caching'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: Authentication và Security', 
        basic: [
          ns('b1', 'Password hashing', 'bcrypt implementation', ['password', 'hashing']),
          ns('b2', 'JWT tokens', 'Generate và verify tokens', ['jwt', 'tokens']),
          ns('b3', 'Session management', 'express-session', ['session', 'management']),
          ns('b4', 'CORS configuration', 'Cross-origin requests', ['cors', 'configuration']),
          ns('b5', 'Input validation', 'Sanitize user input', ['validation', 'sanitization']),
          ns('b6', 'Rate limiting', 'Prevent abuse', ['rate', 'limiting']),
          ns('b7', 'HTTPS setup', 'SSL/TLS certificates', ['https', 'ssl']),
          ns('b8', 'Environment variables', 'Secure configuration', ['env', 'security'])
        ], 
        advanced: [
          ns('a1', 'OAuth 2.0 implementation', 'Third-party authentication', ['oauth', 'authentication']),
          ns('a2', 'Role-based access control', 'RBAC system', ['rbac', 'authorization']),
          ns('a3', 'API security best practices', 'OWASP guidelines', ['api', 'security']),
          ns('a4', 'Penetration testing', 'Security vulnerability assessment', ['penetration', 'testing'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: API Design và Documentation', 
        basic: [
          ns('b1', 'RESTful API principles', 'Resource-based URLs', ['rest', 'principles']),
          ns('b2', 'HTTP status codes', 'Proper response codes', ['http', 'status']),
          ns('b3', 'API versioning', 'URL và header versioning', ['versioning', 'api']),
          ns('b4', 'Swagger/OpenAPI', 'API documentation', ['swagger', 'documentation']),
          ns('b5', 'Request/Response schemas', 'JSON Schema validation', ['schema', 'validation']),
          ns('b6', 'Pagination implementation', 'Limit, offset, cursor', ['pagination', 'limit']),
          ns('b7', 'Filtering và sorting', 'Query parameters', ['filtering', 'sorting']),
          ns('b8', 'API testing với Postman', 'Collection và environments', ['testing', 'postman'])
        ], 
        advanced: [
          ns('a1', 'GraphQL implementation', 'Schema-first development', ['graphql', 'schema']),
          ns('a2', 'API Gateway patterns', 'Routing, load balancing', ['gateway', 'routing']),
          ns('a3', 'HATEOAS implementation', 'Hypermedia APIs', ['hateoas', 'hypermedia']),
          ns('a4', 'API analytics và monitoring', 'Usage tracking, performance', ['analytics', 'monitoring'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: Caching và Performance', 
        basic: [
          ns('b1', 'In-memory caching', 'Node.js memory cache', ['cache', 'memory']),
          ns('b2', 'Redis caching', 'External cache server', ['redis', 'cache']),
          ns('b3', 'Cache strategies', 'Cache-aside, write-through', ['cache', 'strategies']),
          ns('b4', 'HTTP caching headers', 'ETag, Cache-Control', ['http', 'caching']),
          ns('b5', 'Database query optimization', 'Indexes, query analysis', ['database', 'optimization']),
          ns('b6', 'Connection pooling', 'Database connection management', ['connection', 'pooling']),
          ns('b7', 'Compression middleware', 'gzip, brotli', ['compression', 'middleware']),
          ns('b8', 'Performance monitoring', 'APM tools, metrics', ['performance', 'monitoring'])
        ], 
        advanced: [
          ns('a1', 'CDN integration', 'Content delivery networks', ['cdn', 'delivery']),
          ns('a2', 'Load balancing', 'Horizontal scaling', ['load', 'balancing']),
          ns('a3', 'Caching patterns', 'Cache warming, invalidation', ['cache', 'patterns']),
          ns('a4', 'Performance profiling', 'CPU, memory profiling', ['profiling', 'performance'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Message Queues và Event-Driven Architecture', 
        basic: [
          ns('b1', 'Message queue concepts', 'Producer, consumer patterns', ['queue', 'concepts']),
          ns('b2', 'Redis pub/sub', 'Simple messaging', ['redis', 'pubsub']),
          ns('b3', 'RabbitMQ basics', 'AMQP protocol', ['rabbitmq', 'amqp']),
          ns('b4', 'Event emitters', 'Node.js EventEmitter', ['events', 'emitter']),
          ns('b5', 'Background jobs', 'Bull queue, job processing', ['jobs', 'background']),
          ns('b6', 'Retry mechanisms', 'Exponential backoff', ['retry', 'backoff']),
          ns('b7', 'Dead letter queues', 'Failed message handling', ['dlq', 'failed']),
          ns('b8', 'Message serialization', 'JSON, Protocol Buffers', ['serialization', 'protobuf'])
        ], 
        advanced: [
          ns('a1', 'Event sourcing', 'Event store patterns', ['event-sourcing', 'store']),
          ns('a2', 'CQRS implementation', 'Command Query Responsibility Segregation', ['cqrs', 'segregation']),
          ns('a3', 'Saga patterns', 'Distributed transactions', ['saga', 'distributed']),
          ns('a4', 'Apache Kafka integration', 'Stream processing', ['kafka', 'streaming'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: Testing và Quality Assurance', 
        basic: [
          ns('b1', 'Unit testing với Jest', 'Test functions và modules', ['testing', 'jest']),
          ns('b2', 'Integration testing', 'API endpoint testing', ['integration', 'api']),
          ns('b3', 'Test fixtures và mocking', 'Mock databases, external APIs', ['mocking', 'fixtures']),
          ns('b4', 'Test coverage', 'Code coverage analysis', ['coverage', 'analysis']),
          ns('b5', 'Supertest for API testing', 'HTTP assertion library', ['supertest', 'http']),
          ns('b6', 'Database testing', 'Test databases, transactions', ['database', 'testing']),
          ns('b7', 'Error scenario testing', 'Edge cases, error handling', ['error', 'scenarios']),
          ns('b8', 'Test automation', 'CI/CD integration', ['automation', 'cicd'])
        ], 
        advanced: [
          ns('a1', 'End-to-end testing', 'Cypress, Playwright', ['e2e', 'cypress']),
          ns('a2', 'Performance testing', 'Load testing với Artillery', ['performance', 'load']),
          ns('a3', 'Contract testing', 'Pact, API contracts', ['contract', 'pact']),
          ns('a4', 'Chaos engineering', 'Fault injection testing', ['chaos', 'fault'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Logging và Monitoring', 
        basic: [
          ns('b1', 'Structured logging', 'Winston, Pino loggers', ['logging', 'structured']),
          ns('b2', 'Log levels và formatting', 'Debug, info, warn, error', ['log', 'levels']),
          ns('b3', 'Centralized logging', 'ELK stack basics', ['logging', 'centralized']),
          ns('b4', 'Application metrics', 'Custom metrics collection', ['metrics', 'custom']),
          ns('b5', 'Health checks', 'Liveness, readiness probes', ['health', 'probes']),
          ns('b6', 'Error tracking', 'Sentry integration', ['error', 'tracking']),
          ns('b7', 'Performance monitoring', 'Response time, throughput', ['performance', 'monitoring']),
          ns('b8', 'Alerting systems', 'Threshold-based alerts', ['alerting', 'threshold'])
        ], 
        advanced: [
          ns('a1', 'Distributed tracing', 'OpenTelemetry, Jaeger', ['tracing', 'distributed']),
          ns('a2', 'Custom dashboards', 'Grafana, Prometheus', ['dashboard', 'grafana']),
          ns('a3', 'Log aggregation patterns', 'Fluentd, Logstash', ['aggregation', 'fluentd']),
          ns('a4', 'Observability practices', 'Three pillars of observability', ['observability', 'pillars'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Deployment và DevOps', 
        basic: [
          ns('b1', 'Environment configuration', 'Development, staging, production', ['environment', 'config']),
          ns('b2', 'Process managers', 'PM2, forever', ['process', 'pm2']),
          ns('b3', 'Reverse proxy setup', 'Nginx configuration', ['proxy', 'nginx']),
          ns('b4', 'SSL certificate setup', 'Lets Encrypt, HTTPS', ['ssl', 'https']),
          ns('b5', 'Database migrations', 'Production deployment', ['migration', 'production']),
          ns('b6', 'Environment variables', 'Secrets management', ['env', 'secrets']),
          ns('b7', 'Basic monitoring', 'Server monitoring', ['monitoring', 'server']),
          ns('b8', 'Backup strategies', 'Database và file backups', ['backup', 'strategies'])
        ], 
        advanced: [
          ns('a1', 'Docker containerization', 'Multi-stage builds', ['docker', 'multistage']),
          ns('a2', 'Kubernetes deployment', 'Pods, services, ingress', ['kubernetes', 'deployment']),
          ns('a3', 'CI/CD pipelines', 'GitHub Actions, GitLab CI', ['cicd', 'pipelines']),
          ns('a4', 'Infrastructure as Code', 'Terraform, CloudFormation', ['iac', 'terraform'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Microservices Architecture', 
        basic: [
          ns('b1', 'Microservices principles', 'Service decomposition', ['microservices', 'principles']),
          ns('b2', 'Service communication', 'HTTP, gRPC', ['communication', 'grpc']),
          ns('b3', 'Service discovery', 'Consul, Eureka', ['discovery', 'consul']),
          ns('b4', 'API Gateway', 'Kong, Ambassador', ['gateway', 'kong']),
          ns('b5', 'Configuration management', 'Centralized config', ['config', 'centralized']),
          ns('b6', 'Circuit breaker pattern', 'Fault tolerance', ['circuit-breaker', 'fault']),
          ns('b7', 'Service mesh basics', 'Istio, Linkerd', ['service-mesh', 'istio']),
          ns('b8', 'Data consistency', 'Eventual consistency', ['consistency', 'eventual'])
        ], 
        advanced: [
          ns('a1', 'Distributed transactions', 'Two-phase commit, Saga', ['distributed', 'transactions']),
          ns('a2', 'Event-driven microservices', 'Event sourcing, CQRS', ['event-driven', 'cqrs']),
          ns('a3', 'Service orchestration', 'Workflow engines', ['orchestration', 'workflow']),
          ns('a4', 'Microservices testing', 'Contract testing, chaos engineering', ['testing', 'chaos'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Advanced Backend Concepts', 
        basic: [
          ns('b1', 'Serverless functions', 'AWS Lambda, Vercel', ['serverless', 'lambda']),
          ns('b2', 'Edge computing', 'CDN functions', ['edge', 'cdn']),
          ns('b3', 'Real-time applications', 'WebSockets, Server-Sent Events', ['realtime', 'websockets']),
          ns('b4', 'File upload handling', 'Multer, cloud storage', ['upload', 'multer']),
          ns('b5', 'Email services', 'SendGrid, Nodemailer', ['email', 'sendgrid']),
          ns('b6', 'Payment integration', 'Stripe, PayPal APIs', ['payment', 'stripe']),
          ns('b7', 'Search engines', 'Elasticsearch integration', ['search', 'elasticsearch']),
          ns('b8', 'Background processing', 'Cron jobs, scheduled tasks', ['background', 'cron'])
        ], 
        advanced: [
          ns('a1', 'Machine learning APIs', 'TensorFlow.js, ML models', ['ml', 'tensorflow']),
          ns('a2', 'Blockchain integration', 'Smart contracts, Web3', ['blockchain', 'web3']),
          ns('a3', 'IoT backend systems', 'MQTT, device management', ['iot', 'mqtt']),
          ns('a4', 'High-performance computing', 'Worker threads, clustering', ['hpc', 'clustering'])
        ] 
      },
    ]
  },
  'Lập trình Front-end': { 
    color: 'orange', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: HTML & CSS nền tảng', 
        basic: [
          sb('b1', 'HTML semantic tags', 'header,main,footer', 9.0, ['html', 'semantic']),
          sb('b2', 'Flexbox layout', 'display:flex', 8.5, ['css', 'flexbox']),
          ip('b3', 'CSS Grid', 'grid-template-areas', ['css', 'grid']),
          ns('b4', 'Responsive media queries', 'breakpoints', ['css', 'responsive']),
          ns('b5', 'CSS animation', 'keyframes,transition', ['css', 'animation']),
          ns('b6', 'Form validation HTML5', ':valid/:invalid', ['form', 'validation']),
          ns('b7', 'CSS variables', '--custom-property', ['css', 'variables']),
          ns('b8', 'Accessibility ARIA', 'aria-label,role', ['accessibility'])
        ], 
        advanced: [
          ns('a1', 'Mini project: Landing page', 'mobile-first+animation', ['mini-project', 'responsive']),
          ns('a2', 'CSS-in-JS Styled Components', 'dynamic styling', ['css-in-js', 'advanced']),
          ns('a3', 'Web Components với Shadow DOM', 'custom elements', ['web-components', 'shadow-dom']),
          ns('a4', 'CSS Houdini và Paint API', 'custom CSS properties', ['houdini', 'paint-api'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: JavaScript ES6+', 
        basic: [
          ns('b1', 'let, const vs var', 'Block scoping', ['javascript', 'scoping']),
          ns('b2', 'Arrow functions', '() => {} syntax', ['javascript', 'arrow-functions']),
          ns('b3', 'Template literals', 'String interpolation', ['javascript', 'template-literals']),
          ns('b4', 'Destructuring assignment', 'Array và object destructuring', ['javascript', 'destructuring']),
          ns('b5', 'Spread và rest operators', '... operator', ['javascript', 'spread-rest']),
          ns('b6', 'Array methods', 'map, filter, reduce', ['javascript', 'array-methods']),
          ns('b7', 'Promises và async/await', 'Asynchronous programming', ['javascript', 'promises']),
          ns('b8', 'Modules import/export', 'ES6 modules', ['javascript', 'modules'])
        ], 
        advanced: [
          ns('a1', 'Closures và scope chain', 'Advanced scoping concepts', ['javascript', 'closures']),
          ns('a2', 'Prototypes và inheritance', 'Prototype-based OOP', ['javascript', 'prototypes']),
          ns('a3', 'Event loop và concurrency', 'JavaScript runtime model', ['javascript', 'event-loop']),
          ns('a4', 'Performance optimization', 'Memory management, profiling', ['javascript', 'performance'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: React.js Framework', 
        basic: [
          ns('b1', 'JSX syntax', 'JavaScript XML', ['react', 'jsx']),
          ns('b2', 'Functional components', 'Component creation', ['react', 'components']),
          ns('b3', 'Props và PropTypes', 'Component communication', ['react', 'props']),
          ns('b4', 'useState hook', 'State management', ['react', 'usestate']),
          ns('b5', 'useEffect hook', 'Side effects', ['react', 'useeffect']),
          ns('b6', 'Event handling', 'onClick, onChange', ['react', 'events']),
          ns('b7', 'Conditional rendering', 'if statements trong JSX', ['react', 'conditional']),
          ns('b8', 'Lists và keys', 'Rendering arrays', ['react', 'lists'])
        ], 
        advanced: [
          ns('a1', 'Custom hooks', 'Reusable stateful logic', ['react', 'custom-hooks']),
          ns('a2', 'Context API', 'Global state management', ['react', 'context']),
          ns('a3', 'React Router', 'Client-side routing', ['react', 'router']),
          ns('a4', 'Performance optimization', 'useMemo, useCallback, React.memo', ['react', 'performance'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: State Management', 
        basic: [
          ns('b1', 'Component state patterns', 'Local state best practices', ['state', 'local']),
          ns('b2', 'Lifting state up', 'State sharing between components', ['state', 'lifting']),
          ns('b3', 'useReducer hook', 'Complex state logic', ['state', 'reducer']),
          ns('b4', 'Context for global state', 'Provider pattern', ['context', 'global']),
          ns('b5', 'Redux basics', 'Actions, reducers, store', ['redux', 'basics']),
          ns('b6', 'Redux Toolkit', 'Modern Redux patterns', ['redux', 'toolkit']),
          ns('b7', 'Async actions', 'Redux Thunk, async middleware', ['redux', 'async']),
          ns('b8', 'State normalization', 'Flat state structure', ['state', 'normalization'])
        ], 
        advanced: [
          ns('a1', 'Zustand state management', 'Lightweight alternative', ['zustand', 'lightweight']),
          ns('a2', 'Recoil atomic state', 'Facebook\'s state library', ['recoil', 'atomic']),
          ns('a3', 'State machines', 'XState implementation', ['state-machine', 'xstate']),
          ns('a4', 'Optimistic updates', 'UI responsiveness patterns', ['optimistic', 'updates'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: Styling và UI Libraries', 
        basic: [
          ns('b1', 'CSS Modules', 'Scoped CSS', ['css', 'modules']),
          ns('b2', 'Styled Components', 'CSS-in-JS', ['styled', 'components']),
          ns('b3', 'Tailwind CSS', 'Utility-first CSS', ['tailwind', 'utility']),
          ns('b4', 'Material-UI basics', 'Component library', ['mui', 'components']),
          ns('b5', 'Responsive design', 'Mobile-first approach', ['responsive', 'mobile']),
          ns('b6', 'Theme systems', 'Design tokens', ['theme', 'tokens']),
          ns('b7', 'Icon libraries', 'React Icons, Lucide', ['icons', 'libraries']),
          ns('b8', 'Animation libraries', 'Framer Motion basics', ['animation', 'framer'])
        ], 
        advanced: [
          ns('a1', 'Custom design system', 'Component library creation', ['design-system', 'custom']),
          ns('a2', 'Advanced animations', 'Complex motion patterns', ['animation', 'advanced']),
          ns('a3', 'CSS-in-JS performance', 'Runtime vs build-time', ['css-in-js', 'performance']),
          ns('a4', 'Accessibility patterns', 'WCAG compliance', ['accessibility', 'wcag'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Forms và Validation', 
        basic: [
          ns('b1', 'Controlled components', 'Form input handling', ['forms', 'controlled']),
          ns('b2', 'Uncontrolled components', 'useRef for forms', ['forms', 'uncontrolled']),
          ns('b3', 'Form validation', 'Client-side validation', ['validation', 'client']),
          ns('b4', 'React Hook Form', 'Performance-focused forms', ['forms', 'hook-form']),
          ns('b5', 'Formik library', 'Form state management', ['formik', 'state']),
          ns('b6', 'Yup validation schema', 'Schema-based validation', ['yup', 'schema']),
          ns('b7', 'File upload handling', 'File input và preview', ['upload', 'file']),
          ns('b8', 'Dynamic forms', 'Add/remove fields', ['forms', 'dynamic'])
        ], 
        advanced: [
          ns('a1', 'Multi-step forms', 'Wizard patterns', ['forms', 'wizard']),
          ns('a2', 'Form state persistence', 'Local storage integration', ['forms', 'persistence']),
          ns('a3', 'Real-time validation', 'Debounced validation', ['validation', 'realtime']),
          ns('a4', 'Complex form patterns', 'Nested objects, arrays', ['forms', 'complex'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: API Integration và Data Fetching', 
        basic: [
          ns('b1', 'Fetch API basics', 'GET, POST requests', ['fetch', 'api']),
          ns('b2', 'Axios library', 'HTTP client library', ['axios', 'http']),
          ns('b3', 'useEffect for data fetching', 'Component lifecycle', ['useeffect', 'fetching']),
          ns('b4', 'Loading states', 'UI feedback patterns', ['loading', 'states']),
          ns('b5', 'Error handling', 'Try-catch, error boundaries', ['error', 'handling']),
          ns('b6', 'Custom hooks for API', 'Reusable data fetching', ['hooks', 'api']),
          ns('b7', 'SWR library', 'Data fetching với caching', ['swr', 'caching']),
          ns('b8', 'React Query basics', 'Server state management', ['react-query', 'server'])
        ], 
        advanced: [
          ns('a1', 'Advanced React Query', 'Mutations, optimistic updates', ['react-query', 'advanced']),
          ns('a2', 'GraphQL với Apollo', 'GraphQL client', ['graphql', 'apollo']),
          ns('a3', 'Real-time data', 'WebSockets, Server-Sent Events', ['realtime', 'websockets']),
          ns('a4', 'Offline-first patterns', 'Service workers, caching', ['offline', 'service-workers'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Testing Frontend Applications', 
        basic: [
          ns('b1', 'Jest testing framework', 'Unit test setup', ['jest', 'unit']),
          ns('b2', 'React Testing Library', 'Component testing', ['testing-library', 'components']),
          ns('b3', 'Testing hooks', 'Custom hook testing', ['testing', 'hooks']),
          ns('b4', 'Mocking API calls', 'Mock Service Worker', ['mocking', 'api']),
          ns('b5', 'Snapshot testing', 'Component snapshots', ['snapshot', 'testing']),
          ns('b6', 'Accessibility testing', 'jest-axe, screen readers', ['accessibility', 'testing']),
          ns('b7', 'Visual regression testing', 'Chromatic, Percy', ['visual', 'regression']),
          ns('b8', 'Test coverage', 'Coverage reports', ['coverage', 'reports'])
        ], 
        advanced: [
          ns('a1', 'End-to-end testing', 'Cypress, Playwright', ['e2e', 'cypress']),
          ns('a2', 'Performance testing', 'Lighthouse CI', ['performance', 'lighthouse']),
          ns('a3', 'Cross-browser testing', 'BrowserStack, Sauce Labs', ['cross-browser', 'testing']),
          ns('a4', 'Test automation', 'CI/CD integration', ['automation', 'cicd'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Performance Optimization', 
        basic: [
          ns('b1', 'React.memo optimization', 'Preventing re-renders', ['memo', 'optimization']),
          ns('b2', 'useMemo và useCallback', 'Expensive calculations', ['usememo', 'usecallback']),
          ns('b3', 'Code splitting', 'React.lazy, Suspense', ['code-splitting', 'lazy']),
          ns('b4', 'Bundle analysis', 'Webpack Bundle Analyzer', ['bundle', 'analysis']),
          ns('b5', 'Image optimization', 'Lazy loading, WebP', ['image', 'optimization']),
          ns('b6', 'Virtual scrolling', 'Large list performance', ['virtual', 'scrolling']),
          ns('b7', 'Web Vitals', 'Core Web Vitals metrics', ['web-vitals', 'metrics']),
          ns('b8', 'Performance profiling', 'React DevTools Profiler', ['profiling', 'devtools'])
        ], 
        advanced: [
          ns('a1', 'Server-side rendering', 'Next.js SSR', ['ssr', 'nextjs']),
          ns('a2', 'Static site generation', 'SSG patterns', ['ssg', 'static']),
          ns('a3', 'Progressive Web Apps', 'PWA features', ['pwa', 'progressive']),
          ns('a4', 'Edge computing', 'Edge functions, CDN', ['edge', 'computing'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Build Tools và Development Workflow', 
        basic: [
          ns('b1', 'Create React App', 'Zero-config setup', ['cra', 'setup']),
          ns('b2', 'Vite build tool', 'Fast development server', ['vite', 'fast']),
          ns('b3', 'ESLint configuration', 'Code linting', ['eslint', 'linting']),
          ns('b4', 'Prettier formatting', 'Code formatting', ['prettier', 'formatting']),
          ns('b5', 'Git hooks', 'Husky, lint-staged', ['git', 'hooks']),
          ns('b6', 'Environment variables', '.env files', ['env', 'variables']),
          ns('b7', 'Package management', 'npm, yarn, pnpm', ['package', 'management']),
          ns('b8', 'Development vs production', 'Build optimization', ['build', 'optimization'])
        ], 
        advanced: [
          ns('a1', 'Custom Webpack config', 'Advanced bundling', ['webpack', 'custom']),
          ns('a2', 'Micro-frontends', 'Module federation', ['micro-frontend', 'federation']),
          ns('a3', 'Monorepo management', 'Lerna, Nx', ['monorepo', 'lerna']),
          ns('a4', 'CI/CD for frontend', 'Automated deployment', ['cicd', 'deployment'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Advanced Frontend Concepts', 
        basic: [
          ns('b1', 'TypeScript với React', 'Type safety', ['typescript', 'react']),
          ns('b2', 'Component patterns', 'Render props, HOCs', ['patterns', 'components']),
          ns('b3', 'Error boundaries', 'Error handling patterns', ['error', 'boundaries']),
          ns('b4', 'Portals', 'Rendering outside component tree', ['portals', 'rendering']),
          ns('b5', 'Refs và DOM manipulation', 'Direct DOM access', ['refs', 'dom']),
          ns('b6', 'Internationalization', 'i18n, react-i18next', ['i18n', 'internationalization']),
          ns('b7', 'SEO optimization', 'Meta tags, structured data', ['seo', 'optimization']),
          ns('b8', 'Security best practices', 'XSS prevention, CSP', ['security', 'xss'])
        ], 
        advanced: [
          ns('a1', 'Micro-frontend architecture', 'Independent deployments', ['micro-frontend', 'architecture']),
          ns('a2', 'Web Assembly integration', 'WASM với React', ['wasm', 'integration']),
          ns('a3', 'Advanced TypeScript', 'Generic components, utility types', ['typescript', 'advanced']),
          ns('a4', 'Framework-agnostic components', 'Web Components, Stencil', ['framework-agnostic', 'web-components'])
        ] 
      },
    ]
  },
  'Cơ sở dữ liệu': { 
    color: 'teal', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: SQL cơ bản', 
        basic: [
          ns('b1', 'CREATE TABLE', 'Tạo bảng với constraints', ['sql', 'create-table']),
          ns('b2', 'INSERT INTO', 'Thêm dữ liệu vào bảng', ['sql', 'insert']),
          ns('b3', 'SELECT queries', 'Truy vấn dữ liệu cơ bản', ['sql', 'select']),
          ns('b4', 'WHERE conditions', 'Lọc dữ liệu với điều kiện', ['sql', 'where']),
          ns('b5', 'UPDATE và DELETE', 'Cập nhật và xóa dữ liệu', ['sql', 'update-delete']),
          ns('b6', 'ORDER BY và LIMIT', 'Sắp xếp và giới hạn kết quả', ['sql', 'order-limit']),
          ns('b7', 'Aggregate functions', 'COUNT, SUM, AVG, MIN, MAX', ['sql', 'aggregate']),
          ns('b8', 'GROUP BY và HAVING', 'Nhóm dữ liệu và lọc nhóm', ['sql', 'group-having'])
        ], 
        advanced: [
          ns('a1', 'Complex JOINs', 'Multiple table joins', ['sql', 'complex-joins']),
          ns('a2', 'Subqueries và CTEs', 'Nested queries và Common Table Expressions', ['sql', 'subqueries']),
          ns('a3', 'Window functions', 'ROW_NUMBER, RANK, PARTITION BY', ['sql', 'window-functions']),
          ns('a4', 'Stored procedures', 'Reusable SQL code blocks', ['sql', 'stored-procedures'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: Database Design', 
        basic: [
          ns('b1', 'Entity-Relationship Diagram', 'ERD modeling', ['database', 'erd']),
          ns('b2', 'Normalization', '1NF, 2NF, 3NF', ['database', 'normalization']),
          ns('b3', 'Primary và Foreign Keys', 'Relationship constraints', ['database', 'keys']),
          ns('b4', 'Data types selection', 'Choosing appropriate types', ['database', 'data-types']),
          ns('b5', 'Indexes creation', 'Performance optimization', ['database', 'indexes']),
          ns('b6', 'Constraints', 'CHECK, UNIQUE, NOT NULL', ['database', 'constraints']),
          ns('b7', 'Views creation', 'Virtual tables', ['database', 'views']),
          ns('b8', 'Backup và restore', 'Data protection', ['database', 'backup'])
        ], 
        advanced: [
          ns('a1', 'Database partitioning', 'Horizontal và vertical partitioning', ['database', 'partitioning']),
          ns('a2', 'Replication strategies', 'Master-slave, master-master', ['database', 'replication']),
          ns('a3', 'ACID properties', 'Transaction management', ['database', 'acid']),
          ns('a4', 'NoSQL design patterns', 'Document, key-value, graph databases', ['nosql', 'patterns'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: Advanced SQL Techniques', 
        basic: [
          ns('b1', 'INNER và OUTER JOINs', 'Table relationships', ['sql', 'joins']),
          ns('b2', 'UNION và INTERSECT', 'Set operations', ['sql', 'set-operations']),
          ns('b3', 'CASE statements', 'Conditional logic', ['sql', 'case']),
          ns('b4', 'Date và time functions', 'Temporal data handling', ['sql', 'datetime']),
          ns('b5', 'String functions', 'Text manipulation', ['sql', 'string-functions']),
          ns('b6', 'NULL handling', 'COALESCE, ISNULL', ['sql', 'null-handling']),
          ns('b7', 'Recursive queries', 'WITH RECURSIVE', ['sql', 'recursive']),
          ns('b8', 'Pivot và unpivot', 'Data transformation', ['sql', 'pivot'])
        ], 
        advanced: [
          ns('a1', 'Query optimization', 'Execution plans, indexing strategies', ['sql', 'optimization']),
          ns('a2', 'Advanced window functions', 'LAG, LEAD, NTILE', ['sql', 'advanced-window']),
          ns('a3', 'Dynamic SQL', 'Runtime query generation', ['sql', 'dynamic']),
          ns('a4', 'Performance tuning', 'Query analysis và optimization', ['sql', 'performance'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: Database Administration', 
        basic: [
          ns('b1', 'User management', 'CREATE USER, GRANT, REVOKE', ['dba', 'users']),
          ns('b2', 'Security policies', 'Access control, permissions', ['dba', 'security']),
          ns('b3', 'Database monitoring', 'Performance metrics', ['dba', 'monitoring']),
          ns('b4', 'Backup strategies', 'Full, incremental, differential', ['dba', 'backup']),
          ns('b5', 'Recovery procedures', 'Point-in-time recovery', ['dba', 'recovery']),
          ns('b6', 'Maintenance tasks', 'REINDEX, VACUUM, ANALYZE', ['dba', 'maintenance']),
          ns('b7', 'Configuration tuning', 'Memory, connections, cache', ['dba', 'tuning']),
          ns('b8', 'Log management', 'Error logs, query logs', ['dba', 'logging'])
        ], 
        advanced: [
          ns('a1', 'High availability setup', 'Clustering, failover', ['dba', 'ha']),
          ns('a2', 'Disaster recovery', 'DR planning và testing', ['dba', 'disaster-recovery']),
          ns('a3', 'Database migration', 'Version upgrades, platform migration', ['dba', 'migration']),
          ns('a4', 'Automation scripts', 'Maintenance automation', ['dba', 'automation'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: NoSQL Databases', 
        basic: [
          ns('b1', 'MongoDB basics', 'Document database concepts', ['nosql', 'mongodb']),
          ns('b2', 'CRUD operations', 'insertOne, find, updateOne, deleteOne', ['nosql', 'crud']),
          ns('b3', 'Query operators', '$eq, $gt, $in, $regex', ['nosql', 'operators']),
          ns('b4', 'Aggregation pipeline', '$match, $group, $project', ['nosql', 'aggregation']),
          ns('b5', 'Indexing strategies', 'Single field, compound indexes', ['nosql', 'indexing']),
          ns('b6', 'Schema design', 'Embedding vs referencing', ['nosql', 'schema']),
          ns('b7', 'Redis key-value store', 'Caching, session storage', ['nosql', 'redis']),
          ns('b8', 'Graph databases', 'Neo4j basics', ['nosql', 'graph'])
        ], 
        advanced: [
          ns('a1', 'Sharding strategies', 'Horizontal scaling', ['nosql', 'sharding']),
          ns('a2', 'Replica sets', 'High availability', ['nosql', 'replication']),
          ns('a3', 'Advanced aggregation', 'Complex pipelines, $lookup', ['nosql', 'advanced-aggregation']),
          ns('a4', 'Multi-model databases', 'ArangoDB, CosmosDB', ['nosql', 'multi-model'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Data Warehousing', 
        basic: [
          ns('b1', 'Data warehouse concepts', 'OLTP vs OLAP', ['dw', 'concepts']),
          ns('b2', 'Star schema design', 'Fact và dimension tables', ['dw', 'star-schema']),
          ns('b3', 'Snowflake schema', 'Normalized dimensions', ['dw', 'snowflake']),
          ns('b4', 'ETL processes', 'Extract, Transform, Load', ['dw', 'etl']),
          ns('b5', 'Data modeling', 'Kimball vs Inmon methodologies', ['dw', 'modeling']),
          ns('b6', 'Slowly changing dimensions', 'SCD types 1, 2, 3', ['dw', 'scd']),
          ns('b7', 'Data quality', 'Validation, cleansing', ['dw', 'quality']),
          ns('b8', 'OLAP cubes', 'Multidimensional analysis', ['dw', 'olap'])
        ], 
        advanced: [
          ns('a1', 'Real-time data warehousing', 'Streaming ETL', ['dw', 'realtime']),
          ns('a2', 'Data lake architecture', 'Hadoop, Spark', ['dw', 'data-lake']),
          ns('a3', 'Cloud data warehousing', 'Snowflake, BigQuery, Redshift', ['dw', 'cloud']),
          ns('a4', 'Data governance', 'Lineage, cataloging, compliance', ['dw', 'governance'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: Database Programming', 
        basic: [
          ns('b1', 'Stored procedures', 'Parameterized procedures', ['programming', 'procedures']),
          ns('b2', 'Functions', 'Scalar và table-valued functions', ['programming', 'functions']),
          ns('b3', 'Triggers', 'BEFORE, AFTER, INSTEAD OF', ['programming', 'triggers']),
          ns('b4', 'Cursors', 'Row-by-row processing', ['programming', 'cursors']),
          ns('b5', 'Exception handling', 'TRY-CATCH blocks', ['programming', 'exceptions']),
          ns('b6', 'Transactions', 'BEGIN, COMMIT, ROLLBACK', ['programming', 'transactions']),
          ns('b7', 'Variables và parameters', 'Local và global variables', ['programming', 'variables']),
          ns('b8', 'Control flow', 'IF-ELSE, WHILE, FOR loops', ['programming', 'control-flow'])
        ], 
        advanced: [
          ns('a1', 'Advanced triggers', 'Complex business logic', ['programming', 'advanced-triggers']),
          ns('a2', 'User-defined types', 'Custom data types', ['programming', 'udt']),
          ns('a3', 'CLR integration', '.NET code trong SQL Server', ['programming', 'clr']),
          ns('a4', 'Database APIs', 'REST APIs từ database', ['programming', 'apis'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Performance Optimization', 
        basic: [
          ns('b1', 'Query execution plans', 'Understanding execution plans', ['performance', 'execution-plans']),
          ns('b2', 'Index optimization', 'Clustered vs non-clustered', ['performance', 'indexes']),
          ns('b3', 'Query rewriting', 'Optimization techniques', ['performance', 'rewriting']),
          ns('b4', 'Statistics management', 'Query optimizer statistics', ['performance', 'statistics']),
          ns('b5', 'Partitioning', 'Table và index partitioning', ['performance', 'partitioning']),
          ns('b6', 'Caching strategies', 'Query result caching', ['performance', 'caching']),
          ns('b7', 'Connection pooling', 'Resource management', ['performance', 'pooling']),
          ns('b8', 'Monitoring tools', 'Performance monitoring', ['performance', 'monitoring'])
        ], 
        advanced: [
          ns('a1', 'Advanced indexing', 'Filtered, included columns', ['performance', 'advanced-indexing']),
          ns('a2', 'Query hints', 'Optimizer hints', ['performance', 'hints']),
          ns('a3', 'Parallel processing', 'Parallel query execution', ['performance', 'parallel']),
          ns('a4', 'Memory optimization', 'In-memory databases', ['performance', 'memory'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Big Data Technologies', 
        basic: [
          ns('b1', 'Hadoop ecosystem', 'HDFS, MapReduce', ['bigdata', 'hadoop']),
          ns('b2', 'Apache Spark', 'Distributed computing', ['bigdata', 'spark']),
          ns('b3', 'Data processing', 'Batch vs stream processing', ['bigdata', 'processing']),
          ns('b4', 'Apache Kafka', 'Message streaming', ['bigdata', 'kafka']),
          ns('b5', 'Elasticsearch', 'Search và analytics', ['bigdata', 'elasticsearch']),
          ns('b6', 'Data formats', 'Parquet, Avro, ORC', ['bigdata', 'formats']),
          ns('b7', 'Distributed storage', 'HDFS, S3, Azure Blob', ['bigdata', 'storage']),
          ns('b8', 'Data ingestion', 'Flume, Sqoop, NiFi', ['bigdata', 'ingestion'])
        ], 
        advanced: [
          ns('a1', 'Machine learning pipelines', 'MLlib, Spark ML', ['bigdata', 'ml']),
          ns('a2', 'Real-time analytics', 'Streaming analytics', ['bigdata', 'realtime']),
          ns('a3', 'Data mesh architecture', 'Decentralized data', ['bigdata', 'mesh']),
          ns('a4', 'Cloud big data', 'AWS EMR, Azure HDInsight', ['bigdata', 'cloud'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Database Security', 
        basic: [
          ns('b1', 'Authentication methods', 'Database authentication', ['security', 'authentication']),
          ns('b2', 'Authorization models', 'Role-based access control', ['security', 'authorization']),
          ns('b3', 'Data encryption', 'At-rest và in-transit encryption', ['security', 'encryption']),
          ns('b4', 'SQL injection prevention', 'Parameterized queries', ['security', 'injection']),
          ns('b5', 'Audit logging', 'Security event logging', ['security', 'auditing']),
          ns('b6', 'Data masking', 'Sensitive data protection', ['security', 'masking']),
          ns('b7', 'Compliance requirements', 'GDPR, HIPAA, SOX', ['security', 'compliance']),
          ns('b8', 'Vulnerability assessment', 'Security scanning', ['security', 'assessment'])
        ], 
        advanced: [
          ns('a1', 'Advanced threat protection', 'Anomaly detection', ['security', 'threat-protection']),
          ns('a2', 'Zero-trust architecture', 'Database security model', ['security', 'zero-trust']),
          ns('a3', 'Blockchain databases', 'Immutable ledgers', ['security', 'blockchain']),
          ns('a4', 'Privacy-preserving techniques', 'Differential privacy', ['security', 'privacy'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Emerging Database Technologies', 
        basic: [
          ns('b1', 'NewSQL databases', 'CockroachDB, TiDB', ['emerging', 'newsql']),
          ns('b2', 'Time-series databases', 'InfluxDB, TimescaleDB', ['emerging', 'timeseries']),
          ns('b3', 'Vector databases', 'Pinecone, Weaviate', ['emerging', 'vector']),
          ns('b4', 'Multi-model databases', 'ArangoDB, OrientDB', ['emerging', 'multimodel']),
          ns('b5', 'Serverless databases', 'Aurora Serverless, CosmosDB', ['emerging', 'serverless']),
          ns('b6', 'Edge databases', 'Distributed edge computing', ['emerging', 'edge']),
          ns('b7', 'Quantum databases', 'Quantum computing applications', ['emerging', 'quantum']),
          ns('b8', 'AI-powered databases', 'Autonomous databases', ['emerging', 'ai'])
        ], 
        advanced: [
          ns('a1', 'Database as Code', 'Infrastructure automation', ['emerging', 'database-as-code']),
          ns('a2', 'Federated databases', 'Cross-platform querying', ['emerging', 'federated']),
          ns('a3', 'Immutable databases', 'Event sourcing patterns', ['emerging', 'immutable']),
          ns('a4', 'Future trends', 'Next-generation database technologies', ['emerging', 'future'])
        ] 
      },
    ]
  },
  'Lập trình Mobile': { 
    color: 'red', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: React Native cơ bản', 
        basic: [
          ns('b1', 'Setup development environment', 'Expo CLI, Android Studio', ['react-native', 'setup']),
          ns('b2', 'View và Text components', 'Basic UI components', ['react-native', 'components']),
          ns('b3', 'StyleSheet', 'Styling trong React Native', ['react-native', 'styling']),
          ns('b4', 'TouchableOpacity', 'Button interactions', ['react-native', 'touchable']),
          ns('b5', 'TextInput', 'User input handling', ['react-native', 'textinput']),
          ns('b6', 'ScrollView', 'Scrollable content', ['react-native', 'scrollview']),
          ns('b7', 'FlatList', 'Efficient list rendering', ['react-native', 'flatlist']),
          ns('b8', 'Image component', 'Display images', ['react-native', 'image'])
        ], 
        advanced: [
          ns('a1', 'Navigation với React Navigation', 'Stack, Tab, Drawer navigation', ['react-native', 'navigation']),
          ns('a2', 'AsyncStorage', 'Local data persistence', ['react-native', 'asyncstorage']),
          ns('a3', 'Camera và Gallery', 'Media handling', ['react-native', 'camera']),
          ns('a4', 'Push notifications', 'Firebase Cloud Messaging', ['react-native', 'notifications'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: Native Features', 
        basic: [
          ns('b1', 'Geolocation API', 'GPS positioning', ['mobile', 'geolocation']),
          ns('b2', 'Device sensors', 'Accelerometer, gyroscope', ['mobile', 'sensors']),
          ns('b3', 'File system access', 'Read/write files', ['mobile', 'filesystem']),
          ns('b4', 'Network requests', 'HTTP API calls', ['mobile', 'network']),
          ns('b5', 'Offline storage', 'SQLite, Realm', ['mobile', 'offline']),
          ns('b6', 'Biometric authentication', 'Fingerprint, Face ID', ['mobile', 'biometric']),
          ns('b7', 'Deep linking', 'URL scheme handling', ['mobile', 'deep-linking']),
          ns('b8', 'Background tasks', 'Background processing', ['mobile', 'background'])
        ], 
        advanced: [
          ns('a1', 'Native modules', 'Bridge to native code', ['mobile', 'native-modules']),
          ns('a2', 'Performance optimization', 'Memory, battery optimization', ['mobile', 'performance']),
          ns('a3', 'App store deployment', 'Publishing process', ['mobile', 'deployment']),
          ns('a4', 'Cross-platform strategies', 'Code sharing techniques', ['mobile', 'cross-platform'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: State Management trong Mobile', 
        basic: [
          ns('b1', 'Local state với useState', 'Component state management', ['mobile', 'local-state']),
          ns('b2', 'Context API', 'Global state sharing', ['mobile', 'context']),
          ns('b3', 'Redux setup', 'Redux trong React Native', ['mobile', 'redux']),
          ns('b4', 'Redux Toolkit', 'Modern Redux patterns', ['mobile', 'redux-toolkit']),
          ns('b5', 'Async actions', 'API calls với Redux', ['mobile', 'async-redux']),
          ns('b6', 'Zustand', 'Lightweight state management', ['mobile', 'zustand']),
          ns('b7', 'Recoil', 'Atomic state management', ['mobile', 'recoil']),
          ns('b8', 'State persistence', 'Persist state across app restarts', ['mobile', 'persistence'])
        ], 
        advanced: [
          ns('a1', 'Offline-first architecture', 'Sync strategies', ['mobile', 'offline-first']),
          ns('a2', 'Real-time state sync', 'WebSocket integration', ['mobile', 'realtime-sync']),
          ns('a3', 'State machines', 'XState trong mobile apps', ['mobile', 'state-machines']),
          ns('a4', 'Performance optimization', 'State update optimization', ['mobile', 'state-performance'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: UI/UX Design cho Mobile', 
        basic: [
          ns('b1', 'Mobile design principles', 'Touch-first design', ['mobile', 'design-principles']),
          ns('b2', 'Responsive layouts', 'Different screen sizes', ['mobile', 'responsive']),
          ns('b3', 'Typography', 'Mobile typography best practices', ['mobile', 'typography']),
          ns('b4', 'Color schemes', 'Dark mode, accessibility', ['mobile', 'colors']),
          ns('b5', 'Animations', 'React Native Animated API', ['mobile', 'animations']),
          ns('b6', 'Gestures', 'PanGestureHandler, TapGestureHandler', ['mobile', 'gestures']),
          ns('b7', 'Loading states', 'Skeleton screens, spinners', ['mobile', 'loading']),
          ns('b8', 'Error handling UI', 'User-friendly error messages', ['mobile', 'error-ui'])
        ], 
        advanced: [
          ns('a1', 'Advanced animations', 'Reanimated 2, complex transitions', ['mobile', 'advanced-animations']),
          ns('a2', 'Custom components', 'Reusable UI component library', ['mobile', 'custom-components']),
          ns('a3', 'Accessibility', 'Screen readers, accessibility props', ['mobile', 'accessibility']),
          ns('a4', 'Performance UI', 'Optimize rendering performance', ['mobile', 'ui-performance'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: Testing Mobile Applications', 
        basic: [
          ns('b1', 'Unit testing', 'Jest cho React Native', ['mobile', 'unit-testing']),
          ns('b2', 'Component testing', 'React Native Testing Library', ['mobile', 'component-testing']),
          ns('b3', 'Mocking', 'Mock native modules', ['mobile', 'mocking']),
          ns('b4', 'Snapshot testing', 'Component snapshots', ['mobile', 'snapshot']),
          ns('b5', 'Integration testing', 'API integration tests', ['mobile', 'integration']),
          ns('b6', 'E2E testing', 'Detox framework', ['mobile', 'e2e']),
          ns('b7', 'Device testing', 'Physical device testing', ['mobile', 'device-testing']),
          ns('b8', 'Performance testing', 'Memory leaks, performance profiling', ['mobile', 'performance-testing'])
        ], 
        advanced: [
          ns('a1', 'Automated testing', 'CI/CD integration', ['mobile', 'automated-testing']),
          ns('a2', 'Visual regression testing', 'Screenshot comparison', ['mobile', 'visual-testing']),
          ns('a3', 'Load testing', 'App performance under load', ['mobile', 'load-testing']),
          ns('a4', 'Beta testing', 'TestFlight, Google Play Console', ['mobile', 'beta-testing'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Data Management và APIs', 
        basic: [
          ns('b1', 'HTTP requests', 'Fetch API, Axios', ['mobile', 'http']),
          ns('b2', 'REST API integration', 'CRUD operations', ['mobile', 'rest-api']),
          ns('b3', 'GraphQL', 'Apollo Client', ['mobile', 'graphql']),
          ns('b4', 'Caching strategies', 'React Query, SWR', ['mobile', 'caching']),
          ns('b5', 'Offline support', 'Cache-first strategies', ['mobile', 'offline']),
          ns('b6', 'Real-time data', 'WebSockets, Server-Sent Events', ['mobile', 'realtime']),
          ns('b7', 'File uploads', 'Image và document uploads', ['mobile', 'uploads']),
          ns('b8', 'Error handling', 'Network error handling', ['mobile', 'error-handling'])
        ], 
        advanced: [
          ns('a1', 'Optimistic updates', 'UI responsiveness patterns', ['mobile', 'optimistic']),
          ns('a2', 'Data synchronization', 'Conflict resolution', ['mobile', 'sync']),
          ns('a3', 'Background sync', 'Background data fetching', ['mobile', 'background-sync']),
          ns('a4', 'API security', 'Token management, secure storage', ['mobile', 'api-security'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: Device Integration', 
        basic: [
          ns('b1', 'Camera integration', 'Photo capture, video recording', ['mobile', 'camera']),
          ns('b2', 'Media library', 'Photo picker, gallery access', ['mobile', 'media']),
          ns('b3', 'Contacts access', 'Phone contacts integration', ['mobile', 'contacts']),
          ns('b4', 'Calendar events', 'Calendar integration', ['mobile', 'calendar']),
          ns('b5', 'Maps integration', 'Google Maps, Apple Maps', ['mobile', 'maps']),
          ns('b6', 'Audio recording', 'Voice recording, playback', ['mobile', 'audio']),
          ns('b7', 'Barcode scanning', 'QR code, barcode scanner', ['mobile', 'barcode']),
          ns('b8', 'Share functionality', 'Native sharing', ['mobile', 'sharing'])
        ], 
        advanced: [
          ns('a1', 'AR/VR integration', 'Augmented reality features', ['mobile', 'ar-vr']),
          ns('a2', 'Machine learning', 'On-device ML models', ['mobile', 'ml']),
          ns('a3', 'IoT integration', 'Bluetooth, WiFi devices', ['mobile', 'iot']),
          ns('a4', 'Health data', 'HealthKit, Google Fit', ['mobile', 'health'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Performance Optimization', 
        basic: [
          ns('b1', 'Bundle size optimization', 'Code splitting, tree shaking', ['mobile', 'bundle']),
          ns('b2', 'Image optimization', 'Image caching, compression', ['mobile', 'image-optimization']),
          ns('b3', 'Memory management', 'Memory leaks prevention', ['mobile', 'memory']),
          ns('b4', 'Battery optimization', 'Background task management', ['mobile', 'battery']),
          ns('b5', 'Network optimization', 'Request batching, caching', ['mobile', 'network-optimization']),
          ns('b6', 'Rendering optimization', 'FlatList optimization', ['mobile', 'rendering']),
          ns('b7', 'Startup time', 'App launch optimization', ['mobile', 'startup']),
          ns('b8', 'Profiling tools', 'Flipper, React DevTools', ['mobile', 'profiling'])
        ], 
        advanced: [
          ns('a1', 'Native optimization', 'Bridge optimization', ['mobile', 'native-optimization']),
          ns('a2', 'Code push', 'Over-the-air updates', ['mobile', 'code-push']),
          ns('a3', 'Hermes engine', 'JavaScript engine optimization', ['mobile', 'hermes']),
          ns('a4', 'Advanced profiling', 'Performance monitoring', ['mobile', 'advanced-profiling'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Security và Privacy', 
        basic: [
          ns('b1', 'Secure storage', 'Keychain, Keystore', ['mobile', 'secure-storage']),
          ns('b2', 'Authentication', 'Biometric, PIN authentication', ['mobile', 'authentication']),
          ns('b3', 'API security', 'Token management, HTTPS', ['mobile', 'api-security']),
          ns('b4', 'Data encryption', 'Local data encryption', ['mobile', 'encryption']),
          ns('b5', 'Privacy permissions', 'Runtime permissions', ['mobile', 'permissions']),
          ns('b6', 'Code obfuscation', 'Protect source code', ['mobile', 'obfuscation']),
          ns('b7', 'Certificate pinning', 'SSL pinning', ['mobile', 'ssl-pinning']),
          ns('b8', 'Vulnerability scanning', 'Security testing', ['mobile', 'vulnerability'])
        ], 
        advanced: [
          ns('a1', 'Advanced security', 'Root/jailbreak detection', ['mobile', 'advanced-security']),
          ns('a2', 'Compliance', 'GDPR, CCPA compliance', ['mobile', 'compliance']),
          ns('a3', 'Penetration testing', 'Security assessment', ['mobile', 'penetration']),
          ns('a4', 'Zero-trust architecture', 'Mobile security model', ['mobile', 'zero-trust'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Deployment và Distribution', 
        basic: [
          ns('b1', 'Build configuration', 'Debug vs release builds', ['mobile', 'build-config']),
          ns('b2', 'Code signing', 'iOS certificates, Android keystore', ['mobile', 'code-signing']),
          ns('b3', 'App Store submission', 'iOS App Store guidelines', ['mobile', 'app-store']),
          ns('b4', 'Google Play submission', 'Play Store requirements', ['mobile', 'play-store']),
          ns('b5', 'Beta testing', 'TestFlight, Play Console', ['mobile', 'beta']),
          ns('b6', 'App metadata', 'Screenshots, descriptions', ['mobile', 'metadata']),
          ns('b7', 'Version management', 'Semantic versioning', ['mobile', 'versioning']),
          ns('b8', 'Release management', 'Staged rollouts', ['mobile', 'release'])
        ], 
        advanced: [
          ns('a1', 'CI/CD pipelines', 'Automated deployment', ['mobile', 'cicd']),
          ns('a2', 'Fastlane automation', 'Build và deployment automation', ['mobile', 'fastlane']),
          ns('a3', 'Enterprise distribution', 'Internal app distribution', ['mobile', 'enterprise']),
          ns('a4', 'Multi-platform deployment', 'Cross-platform strategies', ['mobile', 'multi-platform'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Advanced Mobile Development', 
        basic: [
          ns('b1', 'Cross-platform frameworks', 'Flutter, Xamarin comparison', ['mobile', 'cross-platform']),
          ns('b2', 'Progressive Web Apps', 'PWA for mobile', ['mobile', 'pwa']),
          ns('b3', 'Hybrid apps', 'Cordova, Ionic', ['mobile', 'hybrid']),
          ns('b4', 'Native development', 'Swift, Kotlin basics', ['mobile', 'native']),
          ns('b5', 'Micro-frontends', 'Mobile micro-frontend architecture', ['mobile', 'micro-frontends']),
          ns('b6', 'Serverless mobile', 'Backend-as-a-Service', ['mobile', 'serverless']),
          ns('b7', 'Edge computing', 'Mobile edge computing', ['mobile', 'edge']),
          ns('b8', 'Future trends', 'Emerging mobile technologies', ['mobile', 'future'])
        ], 
        advanced: [
          ns('a1', 'Custom native modules', 'Bridge development', ['mobile', 'custom-modules']),
          ns('a2', 'Performance engineering', 'Advanced optimization', ['mobile', 'performance-engineering']),
          ns('a3', 'Architecture patterns', 'Clean architecture, MVVM', ['mobile', 'architecture']),
          ns('a4', 'Innovation projects', 'Cutting-edge mobile features', ['mobile', 'innovation'])
        ] 
      },
    ]
  },
  'DevOps và Cloud': { 
    color: 'yellow', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: Docker và Containerization', 
        basic: [
          ns('b1', 'Docker installation', 'Setup Docker environment', ['docker', 'installation']),
          ns('b2', 'Dockerfile creation', 'Container image definition', ['docker', 'dockerfile']),
          ns('b3', 'Docker commands', 'run, build, push, pull', ['docker', 'commands']),
          ns('b4', 'Container networking', 'Port mapping, networks', ['docker', 'networking']),
          ns('b5', 'Volume mounting', 'Data persistence', ['docker', 'volumes']),
          ns('b6', 'Docker Compose', 'Multi-container applications', ['docker', 'compose']),
          ns('b7', 'Environment variables', 'Configuration management', ['docker', 'env-vars']),
          ns('b8', 'Container monitoring', 'Logs và health checks', ['docker', 'monitoring'])
        ], 
        advanced: [
          ns('a1', 'Multi-stage builds', 'Optimized container images', ['docker', 'multi-stage']),
          ns('a2', 'Container security', 'Security best practices', ['docker', 'security']),
          ns('a3', 'Docker Swarm', 'Container orchestration', ['docker', 'swarm']),
          ns('a4', 'Registry management', 'Private registries, Harbor', ['docker', 'registry'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: Kubernetes Orchestration', 
        basic: [
          ns('b1', 'Kubernetes architecture', 'Master, nodes, pods', ['kubernetes', 'architecture']),
          ns('b2', 'Pod management', 'Creating và managing pods', ['kubernetes', 'pods']),
          ns('b3', 'Services và networking', 'ClusterIP, NodePort, LoadBalancer', ['kubernetes', 'services']),
          ns('b4', 'Deployments', 'Rolling updates, rollbacks', ['kubernetes', 'deployments']),
          ns('b5', 'ConfigMaps và Secrets', 'Configuration management', ['kubernetes', 'config']),
          ns('b6', 'Persistent Volumes', 'Storage management', ['kubernetes', 'storage']),
          ns('b7', 'Namespaces', 'Resource isolation', ['kubernetes', 'namespaces']),
          ns('b8', 'kubectl commands', 'Command-line operations', ['kubernetes', 'kubectl'])
        ], 
        advanced: [
          ns('a1', 'Helm charts', 'Package management', ['kubernetes', 'helm']),
          ns('a2', 'Ingress controllers', 'Traffic routing', ['kubernetes', 'ingress']),
          ns('a3', 'StatefulSets', 'Stateful applications', ['kubernetes', 'statefulsets']),
          ns('a4', 'Custom Resource Definitions', 'Extending Kubernetes', ['kubernetes', 'crd'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: CI/CD Pipelines', 
        basic: [
          ns('b1', 'Git workflows', 'Branching strategies', ['git', 'workflows']),
          ns('b2', 'Jenkins setup', 'CI/CD server configuration', ['jenkins', 'setup']),
          ns('b3', 'Pipeline as Code', 'Jenkinsfile, declarative pipelines', ['jenkins', 'pipeline']),
          ns('b4', 'Build automation', 'Automated builds', ['cicd', 'build']),
          ns('b5', 'Testing integration', 'Automated testing', ['cicd', 'testing']),
          ns('b6', 'Deployment strategies', 'Blue-green, canary deployments', ['cicd', 'deployment']),
          ns('b7', 'GitHub Actions', 'GitHub-based CI/CD', ['github', 'actions']),
          ns('b8', 'GitLab CI/CD', 'GitLab pipelines', ['gitlab', 'cicd'])
        ], 
        advanced: [
          ns('a1', 'Advanced pipeline patterns', 'Matrix builds, parallel execution', ['cicd', 'advanced']),
          ns('a2', 'Security scanning', 'SAST, DAST integration', ['cicd', 'security']),
          ns('a3', 'Artifact management', 'Nexus, Artifactory', ['cicd', 'artifacts']),
          ns('a4', 'Pipeline optimization', 'Performance tuning', ['cicd', 'optimization'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: Cloud Platforms (AWS)', 
        basic: [
          ns('b1', 'AWS EC2 basics', 'Virtual machine management', ['aws', 'ec2']),
          ns('b2', 'S3 storage', 'Object storage service', ['aws', 's3']),
          ns('b3', 'RDS databases', 'Managed database service', ['aws', 'rds']),
          ns('b4', 'Load balancers', 'ELB, ALB, NLB', ['aws', 'load-balancer']),
          ns('b5', 'Auto scaling', 'Dynamic resource allocation', ['aws', 'auto-scaling']),
          ns('b6', 'CloudWatch monitoring', 'Metrics và alerting', ['aws', 'cloudwatch']),
          ns('b7', 'IAM security', 'Identity và access management', ['aws', 'iam']),
          ns('b8', 'VPC networking', 'Virtual private cloud', ['aws', 'vpc'])
        ], 
        advanced: [
          ns('a1', 'Serverless với Lambda', 'Function as a Service', ['aws', 'lambda']),
          ns('a2', 'EKS Kubernetes', 'Managed Kubernetes service', ['aws', 'eks']),
          ns('a3', 'CloudFormation', 'Infrastructure as Code', ['aws', 'cloudformation']),
          ns('a4', 'Cost optimization', 'Resource management, billing', ['aws', 'cost-optimization'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: Infrastructure as Code', 
        basic: [
          ns('b1', 'Terraform basics', 'Infrastructure provisioning', ['terraform', 'basics']),
          ns('b2', 'Terraform providers', 'AWS, Azure, GCP providers', ['terraform', 'providers']),
          ns('b3', 'Resource management', 'Creating và managing resources', ['terraform', 'resources']),
          ns('b4', 'State management', 'Terraform state files', ['terraform', 'state']),
          ns('b5', 'Variables và outputs', 'Parameterization', ['terraform', 'variables']),
          ns('b6', 'Modules', 'Reusable infrastructure components', ['terraform', 'modules']),
          ns('b7', 'Ansible basics', 'Configuration management', ['ansible', 'basics']),
          ns('b8', 'Playbooks', 'Automation scripts', ['ansible', 'playbooks'])
        ], 
        advanced: [
          ns('a1', 'Terraform workspaces', 'Environment management', ['terraform', 'workspaces']),
          ns('a2', 'Remote state', 'Collaborative infrastructure', ['terraform', 'remote-state']),
          ns('a3', 'Ansible roles', 'Reusable configurations', ['ansible', 'roles']),
          ns('a4', 'Infrastructure testing', 'Terratest, InSpec', ['iac', 'testing'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Monitoring và Logging', 
        basic: [
          ns('b1', 'Prometheus setup', 'Metrics collection', ['prometheus', 'setup']),
          ns('b2', 'Grafana dashboards', 'Visualization', ['grafana', 'dashboards']),
          ns('b3', 'ELK Stack', 'Elasticsearch, Logstash, Kibana', ['elk', 'stack']),
          ns('b4', 'Log aggregation', 'Centralized logging', ['logging', 'aggregation']),
          ns('b5', 'Alerting rules', 'Automated notifications', ['monitoring', 'alerting']),
          ns('b6', 'Application metrics', 'Custom metrics collection', ['monitoring', 'metrics']),
          ns('b7', 'Health checks', 'Service monitoring', ['monitoring', 'health']),
          ns('b8', 'Performance monitoring', 'APM tools', ['monitoring', 'performance'])
        ], 
        advanced: [
          ns('a1', 'Distributed tracing', 'Jaeger, Zipkin', ['monitoring', 'tracing']),
          ns('a2', 'Observability', 'Three pillars of observability', ['monitoring', 'observability']),
          ns('a3', 'Chaos engineering', 'Fault injection testing', ['monitoring', 'chaos']),
          ns('a4', 'SRE practices', 'Site Reliability Engineering', ['monitoring', 'sre'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: Security và Compliance', 
        basic: [
          ns('b1', 'DevSecOps principles', 'Security in CI/CD', ['security', 'devsecops']),
          ns('b2', 'Vulnerability scanning', 'SAST, DAST tools', ['security', 'scanning']),
          ns('b3', 'Container security', 'Image scanning, runtime security', ['security', 'containers']),
          ns('b4', 'Secrets management', 'HashiCorp Vault, AWS Secrets Manager', ['security', 'secrets']),
          ns('b5', 'Network security', 'Firewalls, security groups', ['security', 'network']),
          ns('b6', 'Identity management', 'RBAC, LDAP integration', ['security', 'identity']),
          ns('b7', 'Compliance frameworks', 'SOC2, PCI DSS, GDPR', ['security', 'compliance']),
          ns('b8', 'Security monitoring', 'SIEM, threat detection', ['security', 'monitoring'])
        ], 
        advanced: [
          ns('a1', 'Zero-trust architecture', 'Security model implementation', ['security', 'zero-trust']),
          ns('a2', 'Penetration testing', 'Security assessment', ['security', 'penetration']),
          ns('a3', 'Incident response', 'Security incident handling', ['security', 'incident']),
          ns('a4', 'Security automation', 'Automated security workflows', ['security', 'automation'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Microservices và Service Mesh', 
        basic: [
          ns('b1', 'Microservices architecture', 'Service decomposition', ['microservices', 'architecture']),
          ns('b2', 'API Gateway', 'Kong, Ambassador, Istio Gateway', ['microservices', 'gateway']),
          ns('b3', 'Service discovery', 'Consul, Eureka', ['microservices', 'discovery']),
          ns('b4', 'Load balancing', 'Service-to-service communication', ['microservices', 'load-balancing']),
          ns('b5', 'Circuit breakers', 'Fault tolerance patterns', ['microservices', 'circuit-breaker']),
          ns('b6', 'Distributed tracing', 'Request flow tracking', ['microservices', 'tracing']),
          ns('b7', 'Configuration management', 'Centralized configuration', ['microservices', 'config']),
          ns('b8', 'Event-driven architecture', 'Message queues, event sourcing', ['microservices', 'events'])
        ], 
        advanced: [
          ns('a1', 'Istio service mesh', 'Advanced traffic management', ['microservices', 'istio']),
          ns('a2', 'Saga patterns', 'Distributed transactions', ['microservices', 'saga']),
          ns('a3', 'CQRS implementation', 'Command Query Responsibility Segregation', ['microservices', 'cqrs']),
          ns('a4', 'Microservices testing', 'Contract testing, chaos engineering', ['microservices', 'testing'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Serverless và Edge Computing', 
        basic: [
          ns('b1', 'Serverless concepts', 'Function as a Service', ['serverless', 'concepts']),
          ns('b2', 'AWS Lambda', 'Serverless functions', ['serverless', 'lambda']),
          ns('b3', 'API Gateway', 'Serverless API management', ['serverless', 'api-gateway']),
          ns('b4', 'Event-driven functions', 'Triggers và events', ['serverless', 'events']),
          ns('b5', 'Serverless databases', 'DynamoDB, Aurora Serverless', ['serverless', 'databases']),
          ns('b6', 'Cold start optimization', 'Performance tuning', ['serverless', 'performance']),
          ns('b7', 'Serverless monitoring', 'CloudWatch, X-Ray', ['serverless', 'monitoring']),
          ns('b8', 'Cost optimization', 'Serverless cost management', ['serverless', 'cost'])
        ], 
        advanced: [
          ns('a1', 'Edge computing', 'CloudFlare Workers, Lambda@Edge', ['serverless', 'edge']),
          ns('a2', 'Serverless frameworks', 'Serverless Framework, SAM', ['serverless', 'frameworks']),
          ns('a3', 'Multi-cloud serverless', 'Portable serverless applications', ['serverless', 'multi-cloud']),
          ns('a4', 'Serverless security', 'Function-level security', ['serverless', 'security'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Performance và Scalability', 
        basic: [
          ns('b1', 'Load testing', 'JMeter, Artillery, k6', ['performance', 'load-testing']),
          ns('b2', 'Performance metrics', 'Response time, throughput, latency', ['performance', 'metrics']),
          ns('b3', 'Caching strategies', 'Redis, Memcached, CDN', ['performance', 'caching']),
          ns('b4', 'Database optimization', 'Query optimization, indexing', ['performance', 'database']),
          ns('b5', 'Auto scaling', 'Horizontal và vertical scaling', ['performance', 'scaling']),
          ns('b6', 'Content delivery', 'CDN configuration', ['performance', 'cdn']),
          ns('b7', 'Resource optimization', 'CPU, memory, storage tuning', ['performance', 'resources']),
          ns('b8', 'Bottleneck identification', 'Performance profiling', ['performance', 'profiling'])
        ], 
        advanced: [
          ns('a1', 'Chaos engineering', 'Netflix Chaos Monkey, Gremlin', ['performance', 'chaos']),
          ns('a2', 'Global load balancing', 'Multi-region deployments', ['performance', 'global']),
          ns('a3', 'Performance automation', 'Automated performance testing', ['performance', 'automation']),
          ns('a4', 'Capacity planning', 'Resource forecasting', ['performance', 'capacity'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Advanced DevOps Practices', 
        basic: [
          ns('b1', 'GitOps workflows', 'Git-based operations', ['devops', 'gitops']),
          ns('b2', 'Feature flags', 'Progressive feature rollout', ['devops', 'feature-flags']),
          ns('b3', 'Disaster recovery', 'Backup và recovery strategies', ['devops', 'disaster-recovery']),
          ns('b4', 'Multi-environment management', 'Dev, staging, production', ['devops', 'environments']),
          ns('b5', 'Team collaboration', 'DevOps culture và practices', ['devops', 'collaboration']),
          ns('b6', 'Metrics và KPIs', 'DevOps performance measurement', ['devops', 'metrics']),
          ns('b7', 'Continuous improvement', 'Retrospectives, optimization', ['devops', 'improvement']),
          ns('b8', 'Documentation', 'Runbooks, architecture docs', ['devops', 'documentation'])
        ], 
        advanced: [
          ns('a1', 'Platform engineering', 'Internal developer platforms', ['devops', 'platform']),
          ns('a2', 'AI/ML operations', 'MLOps practices', ['devops', 'mlops']),
          ns('a3', 'Edge DevOps', 'Edge computing deployment', ['devops', 'edge']),
          ns('a4', 'Future trends', 'Emerging DevOps technologies', ['devops', 'future'])
        ] 
      },
    ]
  },
};

// Migrate to new addressing system
console.log('🚀 Initializing Exercise Bank with new addressing system...');
export const EXERCISE_BANK = migrateExercisesToNewAddressing(ORIGINAL_EXERCISE_BANK);

// Initialize counters for future use
initializeCounters(EXERCISE_BANK);

console.log('✅ Exercise Bank ready with addressing system');