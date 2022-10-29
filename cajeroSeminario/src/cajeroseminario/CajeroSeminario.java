package cajeroseminario;
import javax.swing.JOptionPane;
public class CajeroSeminario {
public static void main(String[] args) {
        int retiro,d=1000,Nip=1235,n,o,i,o2,o3,o4,o5;
        for(i=3;i>=1;i=i-1){
            n=Integer.parseInt(JOptionPane.showInputDialog(null,"Ingrese su NIP","Validacion",JOptionPane.QUESTION_MESSAGE));
            if(n==Nip){
                for(i=3;i>=1;){
                    o=Integer.parseInt(JOptionPane.showInputDialog(null,"Seleccione opcion:\n1.-Saldo\n2.-Retiro\n3.-Historico\n4.-Salir","Menu Principal",JOptionPane.INFORMATION_MESSAGE));
                    switch(o){
                        case 1:
                            o2=Integer.parseInt(JOptionPane.showInputDialog(null,"Cuenta con:"+(d)+"\n1.-Volver\n2.-Salir","Menu Principal",JOptionPane.INFORMATION_MESSAGE));
                            if(d<0){
                                JOptionPane.showMessageDialog(null,"Sin saldo\nVuelva pronto","Saldo",JOptionPane.INFORMATION_MESSAGE);
                                System.exit(0);
                            }
                            if(o2==2){
                                System.exit(0);
                            }
                            break;
                        case 2:  
                            retiro=Integer.parseInt(JOptionPane.showInputDialog(null,"Monto a retirar:","Retiro de efectivo",JOptionPane.QUESTION_MESSAGE));
                            if(retiro>d){
                                o4=Integer.parseInt(JOptionPane.showInputDialog(null,"Imposible retirar\n Saldo insuficiente\n1.-Volver\n2.-Salir","Cantidad invalida",JOptionPane.ERROR_MESSAGE));
                                if(o4==2){
                                    System.exit(0);
                                }
                            }
                            else{
                                o3=Integer.parseInt(JOptionPane.showInputDialog(null,"Su retiro fue de $"+retiro+"\n1.-Volver\n2.-Salir","Retiro exitoso",JOptionPane.INFORMATION_MESSAGE));
                                if(o3==2){
                                    System.exit(0);
                                }
                            }
                            d=d-retiro;
                            if(d<0){
                                JOptionPane.showMessageDialog(null,"Sin saldo\nVuelva pronto","Saldo",JOptionPane.INFORMATION_MESSAGE);
                                System.exit(0);
                            }
                            break;
                        case 3:
                            o5=Integer.parseInt(JOptionPane.showInputDialog(null,"Se ha retirado: "+d+"\nfecha: "+fecha+"\n1.-Volver\n2.-Salir","Movimientos recientes",JOptionPane.INFORMATION_MESSAGE));
                            if(o5==2){
                                System.exit(0);
                            }
                            break;
                        case 4:
                            JOptionPane.showMessageDialog(null,"Gracias por su visita","",JOptionPane.INFORMATION_MESSAGE);
                            System.exit(0);
                            break;
                        default:
                            JOptionPane.showMessageDialog(null,"Opcion invalida","Error",JOptionPane.ERROR_MESSAGE);
                    }
                }
            }
            else{
                JOptionPane.showMessageDialog(null,"Incorrecto, le quedan "+(i-1)+" intentos","Error de Nip",JOptionPane.ERROR_MESSAGE);
            }
        }
        if(i==0){
            JOptionPane.showMessageDialog(null,"Sin oportunidades","",JOptionPane.INFORMATION_MESSAGE);
        }
    }
}
