import java.util.concurrent.atomic.AtomicInteger;

public class NativeExample {
    public interface Callback {
        int onEvent(String message);
    }

    private Callback callback;
    private static AtomicInteger eventCounter = new AtomicInteger(0);

    static {
        try {
            System.loadLibrary("native");
        } catch (UnsatisfiedLinkError e) {
            System.err.println("Failed to load native library: " + e.getMessage());
            System.exit(1);
        }
    }

    public native void startBackgroundThread(Callback callback, int count);
    public native void stopBackgroundThread();

    public int handleEvent(String message) {
        int count = eventCounter.incrementAndGet();
        System.out.println("Java callback received: " + message + " (event #" + count + ")");
        return count;
    }

    public static void main(String[] args) {
        NativeExample example = new NativeExample();
        example.callback = example::handleEvent;
        try {
            example.startBackgroundThread(example.callback, 5);
            Thread.sleep(30000);
            example.stopBackgroundThread();
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
