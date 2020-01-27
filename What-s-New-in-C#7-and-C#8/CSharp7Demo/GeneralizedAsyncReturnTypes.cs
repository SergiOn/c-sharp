using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;

namespace CSharp7Demo {

    public class GeneralizedAsyncReturnTypes {

        public static async Task<long> GetDirSize(string dir) {
            if (!Directory.EnumerateFileSystemEntries(dir).Any())
                return 0;

            // Task<long> is return type so it still needs to be instantiated

            return await Task.Run(() => Directory.GetFiles(dir, "*.*", SearchOption.AllDirectories)
                .Sum(f => new FileInfo(f).Length));
        }

        // C# 7 lets us define custom return types on async methods
        // main requirement is to implement GetAwaiter() method

        // ValueTask is a good example

        // need nuget package
        public static async ValueTask<long> NewGetDirSize(string dir) {
            if (!Directory.EnumerateFileSystemEntries(dir).Any())
                return 0;

            // Task<long> is return type so it still needs to be instantiated

            return await Task.Run(() => Directory.GetFiles(dir, "*.*", SearchOption.AllDirectories)
                .Sum(f => new FileInfo(f).Length));
        }

        public static void MainGART(string[] args) {
            // async methods used to require void, Task or Task<T>

            // C# 7 allows other types such as ValueType<T> - prevent
            // allocation of a task when the result is already available
            // at the time of awaiting

            // Console.WriteLine(NewGetDirSize(@"c:\temp").Result);
            Console.WriteLine(NewGetDirSize(@"/Users/serhii/Desktop/tmp").Result);
        }

    }

}
