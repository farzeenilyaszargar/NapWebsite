#import <Cocoa/Cocoa.h>

@interface TestAppDelegate : NSObject <NSApplicationDelegate>
@property(strong) NSWindow *window;
@property(strong) NSTextField *status;
@property NSInteger clicks;
@end

@implementation TestAppDelegate
- (void)applicationDidFinishLaunching:(NSNotification *)notification {
    NSMenu *menu = [[NSMenu alloc] init];
    NSMenuItem *appItem = [[NSMenuItem alloc] init];
    [menu addItem:appItem];
    NSMenu *appMenu = [[NSMenu alloc] init];
    [appMenu addItemWithTitle:@"Quit Nap Signing Test" action:@selector(terminate:) keyEquivalent:@"q"];
    appItem.submenu = appMenu;
    NSApp.mainMenu = menu;

    self.window = [[NSWindow alloc] initWithContentRect:NSMakeRect(0, 0, 520, 350)
        styleMask:NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskMiniaturizable
        backing:NSBackingStoreBuffered defer:NO];
    self.window.title = @"Nap Signing Test";
    self.window.releasedWhenClosed = NO;

    NSImageView *icon = [[NSImageView alloc] init];
    icon.image = NSApp.applicationIconImage;
    icon.translatesAutoresizingMaskIntoConstraints = NO;
    [icon.widthAnchor constraintEqualToConstant:64].active = YES;
    [icon.heightAnchor constraintEqualToConstant:64].active = YES;

    NSTextField *title = [NSTextField labelWithString:@"Hello from Nap."];
    title.font = [NSFont systemFontOfSize:27 weight:NSFontWeightSemibold];
    NSTextField *subtitle = [NSTextField wrappingLabelWithString:@"A small app for testing your Mac release pipeline.\nThis is a signing test, not the Nap product."];
    subtitle.alignment = NSTextAlignmentCenter;
    subtitle.textColor = NSColor.secondaryLabelColor;
    subtitle.font = [NSFont systemFontOfSize:14];

    NSButton *button = [NSButton buttonWithTitle:@"Test the app" target:self action:@selector(testApp:)];
    button.bezelStyle = NSBezelStyleRounded;
    button.controlSize = NSControlSizeLarge;
    self.status = [NSTextField labelWithString:@"Ready. No network access or personal data required."];
    self.status.font = [NSFont systemFontOfSize:12];
    self.status.textColor = NSColor.secondaryLabelColor;
    self.status.selectable = YES;

    NSStackView *stack = [NSStackView stackViewWithViews:@[icon, title, subtitle, button, self.status]];
    stack.orientation = NSUserInterfaceLayoutOrientationVertical;
    stack.alignment = NSLayoutAttributeCenterX;
    stack.spacing = 17;
    stack.translatesAutoresizingMaskIntoConstraints = NO;
    [self.window.contentView addSubview:stack];
    [NSLayoutConstraint activateConstraints:@[
        [stack.centerXAnchor constraintEqualToAnchor:self.window.contentView.centerXAnchor],
        [stack.centerYAnchor constraintEqualToAnchor:self.window.contentView.centerYAnchor],
        [stack.widthAnchor constraintLessThanOrEqualToConstant:460]
    ]];
    [self.window center];
    [self.window makeKeyAndOrderFront:nil];
    [NSApp activateIgnoringOtherApps:YES];
}

- (void)testApp:(id)sender {
    self.clicks += 1;
    self.status.stringValue = [NSString stringWithFormat:@"App is responding. Test clicks: %ld", (long)self.clicks];
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
    return YES;
}
@end

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        NSApplication *app = [NSApplication sharedApplication];
        app.activationPolicy = NSApplicationActivationPolicyRegular;
        TestAppDelegate *delegate = [[TestAppDelegate alloc] init];
        app.delegate = delegate;
        [app run];
    }
    return 0;
}
