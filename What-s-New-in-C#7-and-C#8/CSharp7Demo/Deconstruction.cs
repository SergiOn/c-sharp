using System;
using static System.Console;

namespace CSharp7Demo {

    public class Deconstruction {

        public static void MainDec(string[] args) {
            var myPoint = new PointDec();
            // var (x, y) = myPoint;
            // WriteLine($"x: {x}, y: {y}");
            var (x, _) = myPoint;
            WriteLine($"x: {x}");
        }
    }

    public class PointDec {
        // public int X, Y;
        public int X = 5;
        public int Y = 7;

        public void Deconstruct(out int x, out int y) {
            x = X;
            y = Y;
        }
    }

}
