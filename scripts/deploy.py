import os
import sys
import pexpect

def deploy():
    print("=== Deploying jitksaha.com to Hostinger ===")
    password = os.getenv("HOSTINGER_SSH_PASS", "Strong#@!1234")
    remote_target = "u740731947@5.183.10.149:domains/jitksaha.com/public_html/"
    
    cmd = f'rsync -avz --inplace --delete -e "ssh -p 65002 -o StrictHostKeyChecking=no" dist/ {remote_target}'
    print(f"Executing: {cmd}")
    child = pexpect.spawn(cmd, encoding="utf-8", timeout=120)
    child.logfile = sys.stdout

    index = child.expect(["(?i)password:", pexpect.EOF, pexpect.TIMEOUT])
    if index == 0:
        child.sendline(password)
        child.expect(pexpect.EOF, timeout=180)
    
    print("\n✅ Successfully deployed to domains/jitksaha.com/public_html/!")

if __name__ == "__main__":
    deploy()
