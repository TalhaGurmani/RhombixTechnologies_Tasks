
from scapy.all import sniff

# Defining a Function packet_capture with packet as a parameter
def packet_capture(packet):
    
    if packet.haslayer("IP"):
        
        print(f"Source IP: {packet["IP"].src} -> Destination IP: {packet["IP"].dst} | {packet.summary()}")
    else:
        
# Prints a one-line summary of each packet
        print(packet.summary()) 
        
# Starts Sniffing packets on the network interface
print("Starting Network sniffer ....")

# Capture packets in real-time and process them using packet_capture without storing them.  
sniff(prn=packet_capture, store=False)
