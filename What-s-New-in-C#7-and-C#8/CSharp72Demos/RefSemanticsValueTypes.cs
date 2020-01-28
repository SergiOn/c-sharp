using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CSharp72Demos {

  struct Point {

    public double X, Y;

    public Point(double x, double y) {
      X = x;
      Y = y;
    }

    public void Reset() {
      X = Y = 0;
    }

    // we don't want to recreate origin as new Point(), so...
    private static Point origin = new Point();
    public static ref readonly Point Origin => ref origin;

    public override string ToString() {
      return $"({X},{Y})";
    }
  }

  public class RefSemanticsValueTypes {
    // IN PARAMETERS

    void changeMe(ref Point p) {
      p.X++;
    }

    // structs are passed by reference (i.e. address, so 32 or 64 bits)
    // 'in' is effectively by-ref and read-only
    double MeasureDistance(in Point p1, in Point p2) {
      // cannot assign to in parameter
      // p1 = new Point();

      // cannot pass as ref or out method
      // obvious
      // changeMe(ref p2);

      p2.Reset(); // instance operations happen on a copy!

      var dx = p1.X - p2.X;
      var dy = p1.Y - p2.Y;
      return Math.Sqrt(dx * dx + dy * dy);
    }

    // cannot create overloads that differ only in presence?
    // yeah you can, but
    //double MeasureDistance(Point p1, Point p2) {
    //  return 0.0;
    //}

    

    public RefSemanticsValueTypes() {
      var p1 = new Point(1, 1);
      var p2 = new Point(4, 5);

      var distance = MeasureDistance(p1, p2);
      //             ^^^^ call ambiguous
      Console.WriteLine($"Distance between {p1} and {p2} is {distance}");

      // can also pass in temporaries
      var distFromOrigin = MeasureDistance(p1, new Point());

      var alsoDistanceFromOrigin = MeasureDistance(p2, Point.Origin);

      // REF READONLY RETURNS

      // make an ordinary by-value copy
      Point copyOfOrigin = Point.Origin;

      // it's readonly, you cannot do a ref!
      //ref var messWithOrigin = ref Point.Origin;

      ref readonly var originRef = ref Point.Origin;
      // won't work
      //originRef.X = 123;
    }

    // REF STRUCTS

    // a value type that MUST be stack-allocated
    // can never be created on the heap
    // created specifically for Span<T>
    
    class CannotDoThis {
      // comment for prevent error
      // Span<byte> stuff;
    }

    public static void MainRSVT(string[] args) {

      new RefSemanticsValueTypes();

      unsafe {
        // managed
        byte* ptr = stackalloc byte[100];
        Span<byte> memory = new Span<byte>(ptr, 100);

        // unmanaged
        IntPtr unmanagedPtr = Marshal.AllocHGlobal(123);
        Span<byte> unmanagedMemory = new Span<byte>(unmanagedPtr.ToPointer(), 123);
        Marshal.FreeHGlobal(unmanagedPtr);
      }

      // implicit cast
      char[] stuff = "hello".ToCharArray();
      Span<char> arrayMemory = stuff;

      // string is immutable so we can make a readonly span
      ReadOnlySpan<char> more = "hi there!".AsSpan();

      Console.WriteLine($"Our span has {more.Length} elements");

      arrayMemory.Fill('x');
      Console.WriteLine(stuff);
      arrayMemory.Clear();
      Console.WriteLine(stuff);
    }
  }

}
